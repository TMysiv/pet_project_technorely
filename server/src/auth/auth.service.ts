import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async registration(userDto: CreateUserDto): Promise<string> {
    const { email, password } = userDto;
    const candidate = await this.usersService.getUserByEmail(email);

    if (candidate) {
      throw new HttpException(
        `User with this email ${email} exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 6);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async login(userDto: LoginUserDto): Promise<string> {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async logout() {}

  private async generateToken(user: User) {
    const payload = { user: user.email, id: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    const { email, password } = userDto;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }

    const passwordEquals = await bcrypt.compare(password, user.password);

    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'Wrong email or password password',
      });
    }
    return user;
  }
}

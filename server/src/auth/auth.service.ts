import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto';
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

  async registration(userDto: CreateUserDto) {
    const { email, password, phone } = userDto;
    const candidate = await this.usersService.getUserByEmail(email);

    if (candidate) {
      throw new HttpException(
        `User with this email ${email} exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkPhone = await this.usersService.getUserByPhone(phone);

    if (checkPhone) {
      throw new HttpException(
        `User with this phone ${phone} exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 6);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    return {
      ...user,
    };
  }

  async login(userDto: LoginUserDto): Promise<string> {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
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

  private async generateToken(user: User): Promise<string> {
    const payload = { user: user.email, id: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { PrismaService } from '../core/prisma.service';

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
      throw new BadRequestException([`User with this ${email} exist`] );
    }

    const checkPhone = await this.usersService.getUserByPhone(phone);

    if (checkPhone) {
      throw new BadRequestException([`User with this phone ${phone} exist`] );
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
    const token = await this.generateToken(user);
    return this.saveToken(user.id, token);
  }

  async logout(token: string): Promise<string> {
    await this.removeToken(token);
    return 'Logout Successfully';
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    const { email, password } = userDto;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException([`Wrong email or password`] );
    }

    const passwordEquals = await bcrypt.compare(password, user.password);

    if (!passwordEquals) {
      throw new BadRequestException([`Wrong email or password`] );
    }
    return user;
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, userId: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  private async saveToken(userId: number, token): Promise<string> {
    const tokenFromDB = await this.prismaService.token.findFirst({
      where: { userId },
    });

    if (tokenFromDB) {
      tokenFromDB.token = token;
      await this.prismaService.token.update({
        where: { id: tokenFromDB.id },
        data: { token: tokenFromDB.token },
      });
      return tokenFromDB.token;
    }

    const newToken = await this.prismaService.token.create({
      data: { userId, token },
    });
    return newToken.token;
  }

  private async removeToken(token: string) {
    try {
      const userFromDb = await this.prismaService.token.findFirst({
        where: { token },
      });
      await this.prismaService.token.delete({ where: { id: userFromDb.id } });
    } catch (e) {
      throw new UnauthorizedException('user not auth');
    }
  }
}

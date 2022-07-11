import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuards implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;

      const token = authHeader.split(' ')[1];

      const user = this.jwtService.verify(token, {
        publicKey: 'secret_key_jwt',
      });

      if (user.role !== 'admin') {
        throw new ForbiddenException({ message: 'no access rights' });
      }

      return true;
    } catch (e) {
      throw new ForbiddenException({ message: 'no access rights' });
    }
  }
}

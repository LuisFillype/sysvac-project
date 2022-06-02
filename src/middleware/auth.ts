import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { JWTProvider } from 'src/providers/jwtProvider';

@Injectable()
export class AuthMiddleware implements CanActivate {
  constructor(private jwtProvider: JWTProvider) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];

      if (!authHeader) {
        throw new UnauthorizedException('Token not provided');
      }

      const token = authHeader.split(' ')[1];
      const decoded = this.jwtProvider.decodeToken(token) as JwtPayload;

      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = { id: decoded.user_id };

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException('Token not provided');
    }
  }
}

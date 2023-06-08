import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt/dist';
import { AUTH_REQUIRED, IS_ADMIN } from './auth.decorators';
import { CustomLogger } from 'src/logging/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext(AuthGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCTX = GqlExecutionContext.create(context);
    const request = gqlCTX.getContext().req;

    const isAuthRequired = this.reflector.get(
      AUTH_REQUIRED,
      gqlCTX.getHandler(),
    );

    if (isAuthRequired) {
      if (
        !request.headers['authorization'] ||
        request.headers['authorization'] === ''
      ) {
        throw new UnauthorizedException('Token Nono');
      }
      const requestingUserId = request.headers['uid'];
      const operationName = request.body.operationName,
        operationArgs = JSON.stringify(request.body.variables);

      this.logger.log(
        `Userul a cerut operatiunea cu numele ${operationName}, folosing argumentele ${operationArgs}`,
        {
          requestingUserId: requestingUserId,
        },
      );

      const token: string = request.headers['authorization'].split(' ')[1];
      const decoded = await this.jwtService.verifyAsync(token);
      if (!decoded) {
        throw new UnauthorizedException('Token invalid');
      }

      const isAdminRequired = this.reflector.get(IS_ADMIN, gqlCTX.getHandler());
      if (!isAdminRequired) {
        return true;
      }
      const rol = decoded.rol;
      if (rol === 'student') {
        throw new UnauthorizedException('Permisiune Nepermisa');
      }
    }
    return true;
  }
}

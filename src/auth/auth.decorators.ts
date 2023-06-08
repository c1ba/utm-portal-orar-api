import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IS_ADMIN = 'is-admin';
export const isAdmin = () => SetMetadata(IS_ADMIN, true);

export const AUTH_REQUIRED = 'auth-req';
export const AuthRequired = () => SetMetadata(AUTH_REQUIRED, true);

export const RequestUserID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlCTX = GqlExecutionContext.create(ctx);
    const request = gqlCTX.getContext().req;

    return request.headers['uid'];
  },
);

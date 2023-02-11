import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN = 'is-admin';
export const isAdmin = () => SetMetadata(IS_ADMIN, true);

export const AUTH_REQUIRED = 'auth-req';
export const AuthRequired = () => SetMetadata(AUTH_REQUIRED, true);

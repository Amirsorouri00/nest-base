import {
  CanActivate,
  CustomDecorator,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata
} from '@nestjs/common';
import { AuthPermissions } from './base/auth';
import { AuthService } from './profile/auth.service';

const CUSTOMER_AUTH_KEY = 'customer_auth';
export const CustomerAuth = (opt?: {
  allow_anonymous: boolean;
}): CustomDecorator =>
  SetMetadata(CUSTOMER_AUTH_KEY, {
    allow_anonymous: opt?.allow_anonymous ?? true,
  });

const ADMIN_AUTH_KEY = 'admin_auth';
export const AdminAuth = (...perms: AuthPermissions[]): CustomDecorator =>
  SetMetadata(ADMIN_AUTH_KEY, { perms });

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (!req.headers['authorization']) {
      console.log(req.headers);
      return false;
    }
    this.authService.decodeJWTToken(req.headers['authorization'].split(' ')[1])
    return true;
  }
}

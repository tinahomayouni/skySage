import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject('ALLOWED_ROLES') private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has one of the allowed roles
    const hasAllowedRole = user && this.allowedRoles.includes(user.role);

    return hasAllowedRole;
  }
}

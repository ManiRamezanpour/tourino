import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { RoleType } from '../shared/interface/role.interface';

function CheckRoleGuard(roles: Array<RoleType>): any {
  class _checkRoleGuard implements CanActivate {
    constructor(private refactor: Reflector) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const user = context.switchToHttp().getRequest().user as User;
      if (roles.length === 0) return true;
      const hasRole: Array<boolean> = roles.map((role) => role == user.role);
      if (hasRole.includes(true)) return true;

      throw new ForbiddenException('PERMISSION_DENIED');
    }
  }
  return _checkRoleGuard;
}

export default CheckRoleGuard;

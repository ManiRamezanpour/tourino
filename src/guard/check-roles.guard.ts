import { CanActivate, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

function CheckRoleGuard(roles: any): any {
  class _checkRoleGuard implements CanActivate {
    constructor(private refactor: Reflector) {}

    canActivate(): boolean | Promise<boolean> | Observable<boolean> {
      if (roles.length === 0) return true;
      const hasRole: Array<boolean> = roles.map((role) => role == 'USER');
      if (hasRole.includes(true)) return true;
      throw new ForbiddenException('PERMISSION_DENIED');
    }
  }
  return _checkRoleGuard;
}

export default CheckRoleGuard;

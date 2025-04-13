import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export function roleGuard(allowedRole: 'admin' | 'utilisateur'): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.getUser();

    if (!user || user.role !== allowedRole) {
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
}

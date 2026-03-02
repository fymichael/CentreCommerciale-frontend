import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['role'];

    if (allowedRoles) {

      // support string ou tableau
      const roles = Array.isArray(allowedRoles)
        ? allowedRoles
        : [allowedRoles];

      console.log("allowedRoles", roles);

      if (!roles.includes(currentUser.role)) {
        this.router.navigate(['/404']);
        return false;
      }
    }

    return true;
  }
}
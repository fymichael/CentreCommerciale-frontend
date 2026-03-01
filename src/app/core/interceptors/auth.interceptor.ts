import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiUrl = `${environment.prodUrl}/auth`;

  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let token = this.authService.getAccessToken();

    // Ne pas ajouter de token sur la route /auth/login ou /auth/refresh-token
    if (token && !req.url.includes('/auth')) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si token expiré ou 401
        if (error.status === 401 && this.authService.getRefreshToken()) {
          return this.handleRefreshToken(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handleRefreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken: this.authService.getRefreshToken() }).pipe(
      switchMap(res => {
        if (!res.accessToken) {
          this.authService.logout();
          return throwError(() => new Error('Token refresh failed'));
        }

        // Mettre à jour le token dans localStorage
        this.authService.saveTokens(res);

        // Rejouer la requête originale avec le nouveau token
        const cloned = req.clone({
          setHeaders: { Authorization: `Bearer ${res.accessToken}` }
        });

        return next.handle(cloned);
      }),
      catchError(() => {
        // Si refresh échoue → logout
        this.authService.logout();
        return throwError(() => new Error('Unauthorized'));
      })
    );
  }
}
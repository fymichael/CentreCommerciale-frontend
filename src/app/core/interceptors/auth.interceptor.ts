
import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiUrl = `${environment.prodUrl}/auth`;

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.authService.getAccessToken();

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError(error => {

        if (error.status === 401) {

          return this.http.post<any>(
            `${this.apiUrl}/refresh-token`,
            { refreshToken: this.authService.getRefreshToken() }
          ).pipe(
            switchMap(res => {

              localStorage.setItem('accessToken', res.accessToken);

              const cloned = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`
                }
              });

              return next.handle(cloned);
            }),
            catchError(() => {
              this.authService.logout();
              return throwError(() => error);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
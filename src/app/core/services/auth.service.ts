import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../features/users/models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUser: any | null = null;

    constructor(private http: HttpClient, private router: Router) {}

    login(data: any) {
        return this.http.post<any>(`${this.apiUrl}`, data);
    }

    saveTokens(tokens: any) {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    logout() {
        this.currentUser = null;
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        const token = this.getAccessToken();
        if (!token) return false;

        return token.split('.').length === 3;
    }

    getUserRole(): string | null {
        const token = this.getAccessToken();

        if (!token) return null;

        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;

            const payload = JSON.parse(atob(parts[1]));
            return 'Admin shop';

        } catch (error) {
            console.error('Token invalide:', error);
            return null;
        }
    }

    getCurrentUser(): any | null {
        const token = this.getAccessToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            const isExpired = payload.exp * 1000 < Date.now();
            if (isExpired) {
                this.logout();
                return null;
            }

            return {
                _id: payload.id,
                email: payload.email,
                username: payload.username,
                role: payload.role
            };

        } catch {
            return null;
        }
    }
}
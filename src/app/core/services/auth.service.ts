import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../features/users/models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    //private apiUrl = `${environment.prodUrl}/auth`;
    private apiUrl = `http://localhost:5000/auth`;

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
            return payload.role || null;

        } catch (error) {
            console.error('Token invalide:', error);
            return null;
        }
    }
}
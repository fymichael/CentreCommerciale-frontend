// services/User.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.prodUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllWithoutFilter(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all-without-filter`);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params });
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  update(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  updateState(id: string, state: number) {
    return this.http.put<User>(`${this.apiUrl}/${id}/state`, { state });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

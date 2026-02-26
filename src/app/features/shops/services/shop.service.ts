import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from '../models/shop.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private apiUrl = `https://centre-commerciale-backend.vercel.app/shops`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiUrl);
  }

  getById(id: string): Observable<Shop> {
    console.log(`${this.apiUrl}/${id}`);
    return this.http.get<Shop>(`${this.apiUrl}/${id}`);
  }

  create(category: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.apiUrl, category);
  }

  update(id: string, category: Shop): Observable<Shop> {
    return this.http.put<Shop>(`${this.apiUrl}/${id}`, category);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

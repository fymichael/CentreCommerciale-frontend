// services/SubscriptionShop.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionShop } from '../models/subscriptionShop.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubscriptionShopService {
  private apiUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private http: HttpClient) {}

  /*getAll(): Observable<SubscriptionShop[]> {
    return this.http.get<User[]>(this.apiUrl);
  }*/

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params });
  }

  getById(id: string): Observable<SubscriptionShop> {
    return this.http.get<SubscriptionShop>(`${this.apiUrl}/${id}`);
  }

  create(subscriptionShop: SubscriptionShop): Observable<SubscriptionShop> {
    return this.http.post<SubscriptionShop>(this.apiUrl, subscriptionShop);
  }

  update(id: string, subscriptionShop: SubscriptionShop): Observable<SubscriptionShop> {
    return this.http.put<SubscriptionShop>(`${this.apiUrl}/${id}`, subscriptionShop);
  }

  updateState(id: string, state: number) {
    return this.http.put<SubscriptionShop>(`${this.apiUrl}/${id}/state`, { state });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

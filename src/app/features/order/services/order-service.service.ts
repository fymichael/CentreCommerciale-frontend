import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/invoices`;

  constructor(private http: HttpClient) {}

  getOrdersByShopId(shopId: string) {
    return this.http.get(`${this.apiUrl}/shop/${shopId}`);
  }

  updateOrderStatus(orderId: string, status: number) {
    return this.http.put(`${this.apiUrl}/${orderId}`, { state: status });
  }
}

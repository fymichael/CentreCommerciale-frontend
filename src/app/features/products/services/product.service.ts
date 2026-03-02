// services/product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.prodUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(data: FormData) {
    return this.http.post<Product>(`${this.apiUrl}/create`, data);
  }

  getByShopId(shopId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/shop/${shopId}`);
  }

  /*create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }*/

  /*update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }*/

  update(id: string, data: FormData) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductsByShop(shopId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?shopId=${shopId}`);
  }
}

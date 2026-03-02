import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StockService {

  private apiUrl = `${environment.apiUrl}/storages`;

  constructor(private http: HttpClient) {}

  getStockState() {
    return this.http.get<any[]>(`${this.apiUrl}/state`);
  }

  addEntry(data: any) {
    return this.http.post(`${this.apiUrl}/entry`, data);
  }

  addExit(data: any) {
    return this.http.post(`${this.apiUrl}/exit`, data);
  }
}
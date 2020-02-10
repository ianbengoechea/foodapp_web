import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private SERVER = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(
    private http: HttpClient,
  ) {
  }

  getMenuFromStoreId(id: number) {
    return this.http.get(`${this.SERVER}/stores/${id}/products`);
  }

  getOrdersFromStoreId(id: number) {
    return this.http.get(`${this.SERVER}/stores/${id}/orders`)
  }

}

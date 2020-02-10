import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from "../../pages/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private SERVER = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(
    private http: HttpClient,
  ) {
  }

  updateOrderStatus(o: Order) {
    return this.http.put(`${this.SERVER}/order/${o.id}`, o, { headers: this.httpHeaders });
  }

}

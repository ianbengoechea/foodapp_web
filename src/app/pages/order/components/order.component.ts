import { Component, OnInit } from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {map, tap} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import Swal from 'sweetalert2';

import { StoreService } from "../../../api/store/store.service";

import { MatTableDataSource } from '@angular/material/table';

import * as OrderActions from '../order.actions';
import { Order } from "../order.model";
import { AppState } from "../../../store/app.reducer";
import {selectAllOrders} from "../order.selectors";

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private customerDoc: AngularFirestoreDocument;
  orderList$: Observable<Order[]>;
  dataSource: any = [];
  checkStatus: boolean;
  displayedColumns: string[] = [
    'order_id',
    'order_date',
    'customer_id',
    'order_total',
    'order_status',
    'order_action'
  ];

  constructor(
              private storeService: StoreService,
              private store: Store<AppState>,
              private db: AngularFirestore
  ) {
    this.customerDoc = db.collection('orders_store').doc('1');
  }

  ngOnInit() {

    this.customerDoc.valueChanges().subscribe( data => this.getOrders());

    this.getOrders()
    this.fillDataInTable();
    this.orderList$ = this.store.pipe(select(selectAllOrders))


    this.orderList$.pipe(tap( (orders: Order[]) => {
      let contador = 0;
      console.log('contador', contador)
      orders.forEach(oneOrder => {
        const accepted = oneOrder.accepted;
        console.log('accepted', accepted)
        if (accepted === 2) {
          contador++
        }
      })
      if (contador === orders.length ) {
        this.checkStatus = true
      }
    })).subscribe()
  }

  fillDataInTable() {
    this.store.pipe(select(selectAllOrders))
      .subscribe(
        (list) =>
          (this.dataSource = new MatTableDataSource<Order>(list))
      );
  }

  getOrders() {
    // aca deberia llamar al selector del store y almacenar el id
    // como no lo tengo implementado, lo pongo en duro
    const idStore: number = 1

    // llama al servicio, obtiene las ordenes y las guarda en el store
    this.storeService.getOrdersFromStoreId(idStore)
      .pipe(
        tap( (list: Order[]) => this.store.dispatch( new OrderActions.OrderGetAllAction(list) ))
      ).subscribe();

  }

  changeStatusOrder( order: Order, id?: number ) {

    if( order && order.accepted !== 1 && order.accepted !== 2) {
      Swal.fire({
        title: 'Enviar pedido a la cocina?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then( () => {
        order.accepted = 1;

        this.store.dispatch( new OrderActions.UpdateOrderStatus(order))
      }).catch( e => console.error('error al enviar el pedido'))
    } else if (id && order.accepted !== 2) {

      order.accepted = 2;

      this.store.dispatch( new OrderActions.UpdateOrderStatus(order))
    }
  }

}

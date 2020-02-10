import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {select, Store} from "@ngrx/store";

import { StoreService } from "../../../api/store/store.service";

import { MatTableDataSource } from '@angular/material/table';

import * as OrderActions from '../order.actions';
import { Order } from "../order.model";
import { AppState } from "../../../store/app.reducer";
import {selectAllOrders} from "../order.selectors";

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderList$: Observable<Order[]>;
  private customerDoc: AngularFirestoreDocument;
  myStoreUpdate: Subscription;

  displayedColumns: string[] = [
    'order_id',
    'order_date',
    'customer_id',
    'order_total',
    'order_status',
    'order_action'
  ];
  dataSource: any = [];

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

  changeStatusOrder( order: Order ) {
    if( order && order.accepted !== 1 ) {
      order.accepted = 1;

      this.store.dispatch( new OrderActions.UpdateOrderStatus(order))
    }

    console.log('order', order)


    // const idCustomer = order.customer.id;
    // const idStore = order.id;
    //
    // order
    //   ? this.store.dispatch( new OrderActions.OrderChangeStatusAction(
    //     {id_store: idStore, id_customer: idCustomer}))
    //   : console.log('no llego ningun id');
  }

}

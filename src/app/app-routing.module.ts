import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './pages/order/components/order.component';
import { MenuComponent } from './pages/menu/components/menu.component';


const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent,
    // canActivate: [ AuthGuard ]
  },
  {
    path: 'menu',
    component: MenuComponent,
    // canActivate: [ AuthGuard ]
  },

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

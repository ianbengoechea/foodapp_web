import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effectComponents } from './pages/pages.effects';
import { appReducers } from './store/app.reducer';

// components
import { AppComponent } from './app/app.component';
import { MenuComponent } from './pages/menu/components/menu.component';
import { OrderComponent } from './pages/order/components/order.component';

import { environment } from 'src/environments/environment';

// firebase
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  entryComponents: [
    AppComponent,
    MenuComponent,
    OrderComponent
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    OrderComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    EffectsModule.forRoot(effectComponents),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

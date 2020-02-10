import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navigation = [
    { icon: 'face', title: 'Administrar Menu', path: '/menu' },
    { icon: 'face', title: 'Administrar Ordenes', path: '/order' }
  ];

}

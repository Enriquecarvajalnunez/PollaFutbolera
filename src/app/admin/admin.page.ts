import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  imports: [IonHeader, IonToolbar, IonContent],
})
export class AdminPage {}

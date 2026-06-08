import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  calculatorOutline,
  personAddOutline,
  scaleOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
  imports: [IonHeader, IonToolbar, IonContent, IonButton, IonIcon],
})
export class AdminPage {
  constructor() {
    // En componentes standalone los iconos NO se registran
    // automáticamente — deben declararse explícitamente aquí.
    addIcons({
      calculatorOutline,
      personAddOutline,
      scaleOutline,
      checkmarkCircleOutline,
    });
  }
}

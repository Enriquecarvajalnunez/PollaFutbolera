import { Component, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { addCircleOutline, searchOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  NavController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
  ],
})
export class HomePage {
  private readonly navCtrl = inject(NavController);
  /** Estadísticas que se mostrarán en las tarjetas superiores.
   *  Los valores serán reemplazados por datos reales cuando
   *  se integre el servicio de backend. */
  stats = [
    { key: 'groups',   label: 'Total Grupos\nde equipos', value: 0 },
    { key: 'teams',    label: 'Total equipos\nde Grupo',  value: 0 },
    { key: 'bettors',  label: 'Total\nApostadores',       value: 0 },
  ];

  constructor() {
    // En componentes standalone los iconos NO se registran
    // automáticamente — deben declararse explícitamente aquí.
    addIcons({ addCircleOutline, searchOutline });
  }

  irARegistrar(): void {
    this.navCtrl.navigateForward('/registrar-apuesta');
  }
}

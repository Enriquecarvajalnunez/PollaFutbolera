import { Component, inject } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import { trophyOutline, refreshOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';

import { RankingService } from '../core/services/ranking.service';
import { RankingEntry } from '../core/models/ranking.model';

@Component({
  selector: 'app-posiciones',
  templateUrl: 'posiciones.page.html',
  styleUrls: ['posiciones.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonSpinner,
  ],
})
export class PosicionesPage implements ViewWillEnter {
  private readonly rankingService = inject(RankingService);

  ranking: RankingEntry[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor() {
    addIcons({ trophyOutline, refreshOutline });
  }

  /** Se ejecuta cada vez que el tab es visible — garantiza datos frescos. */
  async ionViewWillEnter(): Promise<void> {
    await this.cargarRanking();
  }

  async cargarRanking(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const response = await firstValueFrom(this.rankingService.obtener());

      if (response.success) {
        this.ranking = response.ranking;
      } else {
        this.errorMessage = response.error ?? 'No se pudo cargar el ranking.';
      }
    } catch {
      this.errorMessage = 'Error de conexión. Verifica tu red e intenta de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }

}

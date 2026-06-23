import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import { addCircleOutline, searchOutline, footballOutline, closeOutline } from 'ionicons/icons';
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
  IonModal,
  IonButtons,
  IonTitle,
  NavController,
} from '@ionic/angular/standalone';
import { PARTIDOS } from '../core/fixtures/partidos.fixture';
import { GrupoDisplay, buildGrupos } from '../registrar-apuesta/registrar-apuesta.model';
import { RankingService } from '../core/services/ranking.service';
import { RankingEntry } from '../core/models/ranking.model';

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
    IonModal,
    IonButtons,
    IonTitle,
  ],
})
export class HomePage {
  private readonly navCtrl     = inject(NavController);
  private readonly rankingSvc = inject(RankingService);

  readonly grupos: GrupoDisplay[] = buildGrupos(PARTIDOS);

  readonly totalGrupos = this.grupos.length;
  readonly totalEquipos  = PARTIDOS.length * 2;
  totalApostadores = 0;
  apostadores: RankingEntry[] = [];

  showGroupDetail = false;
  showApostadoresDetail = false;

  constructor() {
    addIcons({ addCircleOutline, searchOutline, footballOutline, closeOutline });
  }

  ionViewWillEnter(): void {
    this.cargarApostadores();
  }

  private async cargarApostadores(): Promise<void> {
    try {
      const res = await firstValueFrom(this.rankingSvc.obtener());
      this.totalApostadores = res.ranking.length;
      this.apostadores = res.ranking;
    } catch {
      this.totalApostadores = 0;
    }
  }

  irARegistrar(): void {
    this.navCtrl.navigateForward('/registrar-apuesta');
  }

  irABuscar(): void {
    this.navCtrl.navigateForward('/buscar-apuesta');
  }
}

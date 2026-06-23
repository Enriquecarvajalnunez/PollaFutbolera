import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import {
  calculatorOutline,
  personAddOutline,
  scaleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  alertCircleOutline,
} from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent, IonGrid, IonRow, IonCol,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone';
import { RankingService } from '../core/services/ranking.service';

export interface Admin {
  nombre: string;
  cedula: string;
  correo: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
  imports: [FormsModule, IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonContent, IonButton, IonIcon, IonCard, IonCardContent, IonItem, IonInput, IonLabel, IonList],
})
export class AdminPage {
  private readonly rankingSvc  = inject(RankingService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl   = inject(ToastController);

  admins: Admin[] = [];
  nuevoAdmin: Admin = { nombre: '', cedula: '', correo: '' };
  showAdminForm = false;

  get totalAdmins(): number {
    return this.admins.length;
  }

  isSubmittingCalcular = false;
  isSubmittingBuscar   = false;

  constructor() {
    // En componentes standalone los iconos NO se registran
    // automáticamente — deben declararse explícitamente aquí.
    addIcons({
      calculatorOutline,
      personAddOutline,
      scaleOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      alertCircleOutline,
    });
  }

  async calcularRanking(): Promise<void> {
    if (this.isSubmittingCalcular) return;

    this.isSubmittingCalcular = true;
    const loading = await this.loadingCtrl.create({ message: 'Calculando ranking...' });
    await loading.present();

    try {
      const res = await firstValueFrom(this.rankingSvc.calcular());

      await loading.dismiss();

      if (res.success) {
        await this.showToast(
          `Ranking calculado — ${res.totalJugadores} jugadores procesados`,
          'success',
        );
      } else {
        await this.showToast(res.error ?? 'Error al calcular el ranking', 'danger');
      }
    } catch (err: unknown) {
      console.error('[AdminPage] Error al calcular ranking:', err);
      await loading.dismiss();
      await this.showToast('Error de conexión. Intenta de nuevo.', 'danger');
    } finally {
      this.isSubmittingCalcular = false;
    }
  }

  async buscarEmpates(): Promise<void> {
    if (this.isSubmittingBuscar) return;

    this.isSubmittingBuscar = true;
    const loading = await this.loadingCtrl.create({ message: 'Buscando empates...' });
    await loading.present();

    try {
      const res = await firstValueFrom(this.rankingSvc.buscarEmpates());

      await loading.dismiss();

      if (res.success) {
        if (res.totalGruposEmpate > 0) {
          await this.showToast(
            `Se encontraron ${res.totalGruposEmpate} grupo(s) con empate`,
            'success',
          );
        } else {
          await this.showToast('No se encontraron empates', 'success');
        }
      } else {
        await this.showToast(res.error ?? 'Error al buscar empates', 'danger');
      }
    } catch (err: unknown) {
      console.error('[AdminPage] Error al buscar empates:', err);
      await loading.dismiss();
      await this.showToast('Error de conexión. Intenta de nuevo.', 'danger');
    } finally {
      this.isSubmittingBuscar = false;
    }
  }

  registrarAdmin(): void {
    if (!this.nuevoAdmin.nombre.trim() || !this.nuevoAdmin.cedula.trim()) {
      this.showToast('Completa todos los campos', 'danger');
      return;
    }

    this.admins.push({ ...this.nuevoAdmin });
    this.nuevoAdmin = { nombre: '', cedula: '', correo: '' };
    this.showToast('Administrador registrado', 'success');
  }

  eliminarAdmin(cedula: string): void {
    this.admins = this.admins.filter((a) => a.cedula !== cedula);
    this.showToast('Administrador eliminado', 'success');
  }

  private async showToast(message: string, color: 'success' | 'danger'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3500,
      color,
      position: 'bottom',
      icon: color === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline',
    });
    await toast.present();
  }
}

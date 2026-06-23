import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import { searchOutline, alertCircleOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone';

import { BuscarService } from '../../core/services/buscar-apuesta.service';
import { BetDisplay } from '../../core/models/buscar-apuesta.model';

interface GrupoConPartidos {
  grupo: string;
  partidos: BetDisplay[];
}

@Component({
  selector: 'app-buscar-apuesta',
  templateUrl: './buscar-apuesta.page.html',
  styleUrls: ['./buscar-apuesta.page.scss'],
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonBackButton,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
  ],
})

export class BuscarApuestaPage {
  private readonly fb = inject(FormBuilder);
  private readonly buscarService = inject(BuscarService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl = inject(ToastController);
  isSubmitting = false;
  nombre: string | null = null;
  bets: BetDisplay[] = [];
  searched = false;
  readonly form = this.fb.group({
    identificacion: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\d+$/)]],
  });
  constructor() {
    addIcons({ searchOutline, alertCircleOutline });
  }
  get grupos(): GrupoConPartidos[] {
    const map = new Map<string, BetDisplay[]>();
    for (const bet of this.bets) {
      const list = map.get(bet.grupo) ?? [];
      list.push(bet);
      map.set(bet.grupo, list);
    }
    return Array.from(map.entries()).map(([grupo, partidos]) => ({ grupo, partidos }));
  }
  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    this.searched = false;
    this.nombre = null;
    this.bets = [];
    const loading = await this.loadingCtrl.create({ message: 'Buscando apuestas...' });
    await loading.present();
    try {
      const { identificacion } = this.form.getRawValue();
      const response = await firstValueFrom(this.buscarService.obtener(identificacion!));
      if (response.success) {
        this.nombre = response.nombre;
        this.bets = response.bets ?? [];
      } else {
        await this.showToast(response.error ?? 'No se encontraron apuestas para esta cédula', 'danger');
      }
    } catch {
      await this.showToast('Error de conexión. Intenta de nuevo.', 'danger');
    } finally {
      this.searched = true;
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }
  private async showToast(message: string, color: 'success' | 'danger'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3500,
      color,
      position: 'bottom',
      icon: color === 'danger' ? 'alert-circle-outline' : undefined,
    });
    await toast.present();
  }
}
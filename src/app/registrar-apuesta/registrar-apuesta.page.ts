import { Component, inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, alertCircleOutline, sendOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonNote,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSpinner,
  LoadingController,
  ToastController,
  NavController,
} from '@ionic/angular/standalone';

import { ApuestasService } from '../core/services/apuestas.service';
import { RelojService } from '../core/services/reloj.service';
import { PARTIDOS, Partido } from '../core/fixtures/partidos.fixture';

interface GrupoDisplay {
  nombre: string;
  partidos: Array<Partido & { index: number }>;
}

@Component({
  selector: 'app-registrar-apuesta',
  templateUrl: 'registrar-apuesta.page.html',
  styleUrls: ['registrar-apuesta.page.scss'],
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonNote,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonSpinner,
  ],
})
export class RegistrarApuestaPage {
  private readonly fb             = inject(FormBuilder);
  private readonly apuestasService = inject(ApuestasService);
  private readonly relojService   = inject(RelojService);
  private readonly loadingCtrl    = inject(LoadingController);
  private readonly toastCtrl      = inject(ToastController);
  private readonly navCtrl        = inject(NavController);

  /** Grupos calculados a partir del fixture — solo para display. */
  readonly grupos: GrupoDisplay[];

  /** true mientras el POST está en vuelo — evita doble-submit. */
  isSubmitting = false;

  readonly form: FormGroup;

  constructor() {
    addIcons({ checkmarkCircleOutline, alertCircleOutline, sendOutline });

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      identificacion: [
        '',
        [Validators.required, Validators.minLength(6), Validators.pattern(/^\d+$/)],
      ],
      bets: this.fb.array(
        PARTIDOS.map((p) =>
          this.fb.group({
            grupo:     [p.grupo],
            equipoA:   [p.equipoA],
            equipoB:   [p.equipoB],
            marcadorA: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
            marcadorB: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
          })
        )
      ),
    });

    this.grupos = this.buildGrupos();
  }

  get bets(): FormArray {
    return this.form.get('bets') as FormArray;
  }

  betGroup(index: number): FormGroup {
    return this.bets.at(index) as FormGroup;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const loading = await this.loadingCtrl.create({ message: 'Verificando plazo...' });
    await loading.present();

    try {
      //Verificar que la ventana de apuestas esté abierta
      const reloj = await firstValueFrom(this.relojService.verificar());

      if (!reloj.success || !reloj.abierto) {
        await loading.dismiss();
        await this.showToast(
          reloj.fechalimite
            ? `El plazo de apuestas cerró el ${reloj.fechalimite}`
            : 'El plazo de apuestas ya está cerrado',
          'danger'
        );
        return;
      }

      //Enviar la apuesta
      loading.message = 'Registrando apuesta...';
      const { nombre, identificacion, bets } = this.form.getRawValue();
      const response = await firstValueFrom(
        this.apuestasService.registrar({ nombre, identificacion, bets })
      );

      await loading.dismiss();

      if (response.success) {
        await this.showToast('¡Apuesta registrada con éxito!', 'success');
        this.navCtrl.navigateBack('/tabs/inicio');
      } else {
        await this.showToast(response.error ?? 'Error al registrar la apuesta', 'danger');
      }
    } catch {
      await loading.dismiss();
      await this.showToast('Error de conexión. Intenta de nuevo.', 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────

  private buildGrupos(): GrupoDisplay[] {
    const map = new Map<string, Array<Partido & { index: number }>>();
    PARTIDOS.forEach((partido, index) => {
      if (!map.has(partido.grupo)) map.set(partido.grupo, []);
      map.get(partido.grupo)!.push({ ...partido, index });
    });
    return Array.from(map.entries()).map(([nombre, partidos]) => ({ nombre, partidos }));
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

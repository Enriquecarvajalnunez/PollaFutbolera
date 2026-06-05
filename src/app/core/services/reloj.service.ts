import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RelojResponse } from '../models/reloj.model';

/**
 * Verifica si la ventana de apuestas está abierta consultando
 * el Apps Script antes de permitir el envío del formulario.
 */
@Injectable({ providedIn: 'root' })
export class RelojService {
  private readonly api = inject(ApiService);

  verificar(): Observable<RelojResponse> {
    return this.api.get<RelojResponse>({ accion: 'verificarReloj' });
  }
}

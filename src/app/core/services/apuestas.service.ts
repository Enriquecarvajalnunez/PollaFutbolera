import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApuestaPayload, RegistrarApuestaResponse } from '../models/apuesta.model';

@Injectable({ providedIn: 'root' })
export class ApuestasService {
  private readonly api = inject(ApiService);

  registrar(payload: ApuestaPayload): Observable<RegistrarApuestaResponse> {
    return this.api.post<RegistrarApuestaResponse>(payload);
  }
}

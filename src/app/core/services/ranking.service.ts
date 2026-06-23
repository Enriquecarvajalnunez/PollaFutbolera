import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BuscarEmpatesResponse, CalcularRankingResponse, RankingResponse } from '../models/ranking.model';

/**
 * Consulta la tabla de posiciones al Google Apps Script.
 * Usa el método verRanking expuesto en el Web App.
 */
@Injectable({ providedIn: 'root' })
export class RankingService {
  private readonly api = inject(ApiService);

  obtener(): Observable<RankingResponse> {
    return this.api.get<RankingResponse>({ accion: 'verRanking' });
  }

  calcular(): Observable<CalcularRankingResponse> {
    return this.api.get<CalcularRankingResponse>({ accion: 'calcularRanking' });
  }

  buscarEmpates(): Observable<BuscarEmpatesResponse> {
    return this.api.get<BuscarEmpatesResponse>({ accion: 'buscarEmpates' });
  }
}

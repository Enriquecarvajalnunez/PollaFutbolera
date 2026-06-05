import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Capa de infraestructura HTTP hacia el Google Apps Script.
 *
 * CORS con GAS — por qué usamos Content-Type: text/plain en POST:
 * Los browsers envían una petición OPTIONS (preflight) antes de
 * cualquier POST con Content-Type: application/json. El Apps Script
 * NO responde a OPTIONS, por lo que el preflight falla y el browser
 * bloquea la petición. Al usar text/plain, la petición se considera
 * "simple" y no genera preflight. El GAS recibe el body y puede
 * parsearlo con JSON.parse(e.postData.contents).
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.gasApiUrl;

  /** GET al Apps Script — parámetros enviados como query string. */
  get<T>(params: Record<string, string>): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T>(this.baseUrl, { params: httpParams });
  }

  /**
   * POST al Apps Script — body enviado como text/plain para evitar
   * el preflight CORS que GAS no soporta.
   * El GAS debe leer: JSON.parse(e.postData.contents)
   */
  post<T>(body: object): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<T>(this.baseUrl, JSON.stringify(body), { headers });
  }
}

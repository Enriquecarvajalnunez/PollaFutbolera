import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from '../../../environments/environment';

/**
 * Error tipado que emite ApiService cuando una petición falla.
 * Permite que los consumidores distingan errores de red de
 * errores de negocio (response.success === false).
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly cause: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Capa de infraestructura HTTP hacia el Google Apps Script.
 *
 * Usa CapacitorHttp en lugar de Angular HttpClient para evitar el
 * problema de CORS en Android WebView:
 *
 * GAS responde con un redirect 302 hacia script.googleusercontent.com.
 * En el browser (ionic serve) Chrome lo maneja sin problema. En el
 * WebView de Android la respuesta del redirect no incluye los headers
 * CORS que el WebView exige, bloqueando la lectura de la respuesta.
 *
 * CapacitorHttp hace peticiones nativas en Android (sin pasar por el
 * WebView) eliminando por completo la restricción CORS. En browser
 * cae a XHR con el mismo comportamiento anterior.
 *
 * Manejo de errores:
 * - retry(1): reintenta una vez ante fallos transitorios de red.
 * - catchError: convierte cualquier error crudo en ApiError tipado
 *   y lo loguea con contexto antes de propagarlo.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.gasApiUrl;

  /** GET al Apps Script — parámetros enviados como query string. */
  get<T>(params: Record<string, string>): Observable<T> {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.baseUrl}?${queryString}`;

    return from(CapacitorHttp.get({ url })).pipe(
      map((res) => res.data as T),
      retry(1),
      catchError((err: unknown) => this.handleError('GET', url, err)),
    );
  }

  /**
   * POST al Apps Script.
   * Content-Type: text/plain se mantiene para compatibilidad con el
   * browser: evita el preflight CORS que GAS no soporta en XHR.
   * En nativo no aplica CORS pero no rompe nada mantenerlo.
   */
  post<T>(body: object): Observable<T> {
    return from(
      CapacitorHttp.post({
        url: this.baseUrl,
        headers: { 'Content-Type': 'text/plain' },
        data: JSON.stringify(body),
      }),
    ).pipe(
      map((res) => res.data as T),
      retry(1),
      catchError((err: unknown) => this.handleError('POST', this.baseUrl, err)),
    );
  }

  // ── Helpers ──────────────────────────────────────────────────────────

  private handleError(method: string, url: string, err: unknown): Observable<never> {
    console.error(`[ApiService] ${method} ${url}`, err);
    return throwError(() => new ApiError('Error de comunicación con el servidor', err));
  }
}

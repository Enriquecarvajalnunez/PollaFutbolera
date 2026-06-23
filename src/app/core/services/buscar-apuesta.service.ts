import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { BuscarApuestasResponse } from "../models/buscar-apuesta.model";

@Injectable({ providedIn: 'root' })
export class BuscarService {
    private readonly api = inject(ApiService);

    obtener(cedula: string): Observable<BuscarApuestasResponse> {
        return this.api.get<BuscarApuestasResponse>({ accion: 'verApuestas', cedula });
    }
}

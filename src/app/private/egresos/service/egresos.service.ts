import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { EgresosTO } from './egresosto.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EgresosService {
  constructor(private _http: HttpClient) {}

  URL_API: String = environment.UrlApi;

  listarEgresos(): Observable<EgresosTO[]> {
    return this._http.get<EgresosTO[]>(
      `${this.URL_API}/egresos/usuario`
    );
  }

  datosEgreso(egresoID: String): Observable<EgresosTO> {
    return this._http.get<EgresosTO>(`${this.URL_API}/egresos/${egresoID}`);
  }

  crearEgreso(egreso: EgresosTO): Observable<EgresosTO> {
    return this._http.post<EgresosTO>(`${this.URL_API}/egresos/`, egreso);
  }

  actualizarEgreso(egreso: EgresosTO): Observable<EgresosTO> {
    return this._http.put<EgresosTO>(`${this.URL_API}/egresos/`, egreso);
  }

  eliminarEgreso(egresoID: String): Observable<EgresosTO> {
    return this._http.delete<EgresosTO>(`${this.URL_API}/egresos/${egresoID}`);
  }
}

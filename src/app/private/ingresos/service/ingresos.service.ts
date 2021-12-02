import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IngresosTO } from './ingresosto.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  constructor(private _http: HttpClient) {}

  URL_API: String = environment.UrlApi;

  listarIngresos(): Observable<IngresosTO[]> {
    return this._http.get<IngresosTO[]>(
      `${this.URL_API}/ingresos/usuario`
    );
  }

  datosIngreso(ingresoID: String): Observable<IngresosTO> {
    return this._http.get<IngresosTO>(`${this.URL_API}/ingresos/${ingresoID}`);
  }

  crearIngreso(ingreso: IngresosTO): Observable<IngresosTO> {
    return this._http.post<IngresosTO>(`${this.URL_API}/ingresos/`, ingreso);
  }

  actualizarIngreso(ingreso: IngresosTO): Observable<IngresosTO> {
    return this._http.put<IngresosTO>(`${this.URL_API}/ingresos/`, ingreso);
  }

  eliminarIngreso(ingresoID: String): Observable<IngresosTO> {
    return this._http.delete<IngresosTO>(
      `${this.URL_API}/ingresos/${ingresoID}`
    );
  }
}

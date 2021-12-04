import { MunicipiosTO } from './municipiosto.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MunicipiosService {
  constructor(private _http: HttpClient) {}

  URL_API: String = environment.UrlApi;

  listarDepartamentos() {
    return this._http.get(`${this.URL_API}/municipios/2`);
  }

  listarxDepartamento(departamento: any): Observable<MunicipiosTO[]> {
    return this._http.get<MunicipiosTO[]>(
      `${this.URL_API}/municipios/${departamento}`
    );
  }
}

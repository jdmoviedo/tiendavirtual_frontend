import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { UsuariosTO } from './usuariosto.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private _http: HttpClient) {}

  URL_API: String = environment.UrlApi;

  listarUsuarios(): Observable<UsuariosTO[]> {
    return this._http.get<UsuariosTO[]>(`${this.URL_API}/usuarios`);
  }
}

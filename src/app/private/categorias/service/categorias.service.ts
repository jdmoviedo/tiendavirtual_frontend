import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { CategoriasTO } from './categoriasto.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private _http: HttpClient) {}

  URL_API: String = environment.UrlApi;

  listarCategorias(): Observable<CategoriasTO[]> {
    return this._http.get<CategoriasTO[]>(
      `${this.URL_API}/categorias/usuario`
    );
  }

  datosCategoria(categoriaID: String): Observable<CategoriasTO> {
    return this._http.get<CategoriasTO>(
      `${this.URL_API}/categorias/${categoriaID}`
    );
  }

  crearCategoria(categoria: CategoriasTO): Observable<CategoriasTO> {
    return this._http.post<CategoriasTO>(
      `${this.URL_API}/categorias/`,
      categoria
    );
  }

  actualizarCategoria(categoria: CategoriasTO): Observable<CategoriasTO> {
    return this._http.put<CategoriasTO>(
      `${this.URL_API}/categorias/`,
      categoria
    );
  }

  eliminarEgreso(categoriaID: String): Observable<CategoriasTO> {
    return this._http.delete<CategoriasTO>(
      `${this.URL_API}/categorias/${categoriaID}`
    );
  }
}

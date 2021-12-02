import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { ProductosTO } from './productosto.interface';
import { environment } from '../../../../environments/environment';
import { CategoriasTO } from '../../categorias/service/categoriasto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private _http: HttpClient) {}

  URL_API: String = environment.UrlApi;

  listarProductos(): Observable<ProductosTO[]> {
    return this._http.get<ProductosTO[]>(
      `${this.URL_API}/productos/usuario/`
    );
  }

  listarProductosxCategoria(categoria: any): Observable<ProductosTO[]> {
    return this._http.post<ProductosTO[]>(
      `${this.URL_API}/productos/usuario/`,
      categoria
    );
  }

  datosProducto(productoID: String): Observable<ProductosTO> {
    return this._http.get<ProductosTO>(
      `${this.URL_API}/productos/${productoID}`
    );
  }

  crearProducto(producto: ProductosTO): Observable<ProductosTO> {
    return this._http.post<ProductosTO>(`${this.URL_API}/productos/`, producto);
  }

  actualizarProducto(producto: ProductosTO): Observable<ProductosTO> {
    return this._http.put<ProductosTO>(`${this.URL_API}/productos/`, producto);
  }

  eliminarProducto(productoID: String): Observable<ProductosTO> {
    return this._http.delete<ProductosTO>(
      `${this.URL_API}/productos/${productoID}`
    );
  }
}

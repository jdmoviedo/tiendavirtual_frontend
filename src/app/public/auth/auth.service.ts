import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { UsuariosTO } from 'src/app/private/usuarios/service/usuariosto.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private router: Router) {}

  URL_API: String = environment.UrlApi;

  signIn(usuario: UsuariosTO): Observable<UsuariosTO> {
    return this._http.post<UsuariosTO>(
      `${this.URL_API}/usuarios/signin`,
      usuario
    );
  }

  signUp(usuario: UsuariosTO): Observable<UsuariosTO> {
    return this._http.post<UsuariosTO>(
      `${this.URL_API}/usuarios/signup`,
      usuario
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

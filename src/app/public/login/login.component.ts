import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosTO } from '../../private/usuarios/service/usuariosto.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private titleService: Title,
    private readonly router: Router,
    private _authService: AuthService
  ) {}

  usuario: UsuariosTO = new UsuariosTO();

  signIn() {
    this._authService.signIn(this.usuario).subscribe((data) => {
      localStorage.setItem('token', data.token);
      this.router.navigate(['/admin/egresos']);
    });
  }

  ngOnInit(): void {
    if (this._authService.loggedIn()) this.router.navigate(['/admin/egresos']);
    this.titleService.setTitle('Login');
  }
}

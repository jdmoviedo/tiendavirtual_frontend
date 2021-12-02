import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosTO } from '../../private/usuarios/service/usuariosto.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private titleService: Title,
    private readonly router: Router,
    private _authService: AuthService
  ) {}

  usuario: UsuariosTO = new UsuariosTO();

  signUp() {
    this._authService.signUp(this.usuario).subscribe((data) => {
      this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
    if (this._authService.loggedIn()) this.router.navigate(['/admin/egresos']);
    this.titleService.setTitle('Register');
  }
}

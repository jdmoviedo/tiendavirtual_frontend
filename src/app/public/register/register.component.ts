import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosTO } from '../../private/usuarios/service/usuariosto.interface';
import { AuthService } from '../auth/auth.service';
import { MunicipiosTO } from '../../private/municipios/service/municipiosto.interface';
import { MunicipiosService } from '../../private/municipios/service/municipios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private titleService: Title,
    private readonly router: Router,
    private _authService: AuthService,
    private _municipiosService: MunicipiosService
  ) {}

  usuario: UsuariosTO = new UsuariosTO();
  municipio: MunicipiosTO = new MunicipiosTO();
  listaMunicipios: MunicipiosTO[] = new Array<MunicipiosTO>();
  listaDepartamentos: any;

  listarDepartamentos() {
    this._municipiosService.listarDepartamentos().subscribe((data) => {
      this.listaDepartamentos = data;
    });
  }

  listarxDepartamento() {
    setTimeout(() => {
      this._municipiosService
        .listarxDepartamento(this.municipio.departamento)
        .subscribe((data) => {
          this.listaMunicipios = data;
        });
    }, 100);
  }

  signUp() {
    this._authService.signUp(this.usuario).subscribe((data) => {
      this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
    if (this._authService.loggedIn()) this.router.navigate(['/admin/egresos']);
    this.listarDepartamentos();
    this.titleService.setTitle('Register');
  }
}

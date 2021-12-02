import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { UsuariosService } from './service/usuarios.service';
import { UsuariosTO } from './service/usuariosto.interface';
// import * as $ from 'jquery';// import Jquery here
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public constructor(
    private titleService: Title,
    private _usuariosService: UsuariosService
  ) {}
  listaUsuarios: UsuariosTO[] = new Array<UsuariosTO>();
  usuario: UsuariosTO = new UsuariosTO();
  dtOptions: any = {};

  listarUsuarios() {
    this._usuariosService.listarUsuarios().subscribe((data) => {
      $('#dttableUsuarios').DataTable().clear();
      $('#dttableUsuarios').DataTable().rows.add(data).draw();
      $('#dttableUsuarios').DataTable().columns.adjust().draw();
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Usuarios');
    $('#dttableUsuarios').DataTable({
      columns: [
        {
          title: 'ID',
          className: 'text-center text-nowrap',
          data: '_id',
        },
        {
          title: 'CORREO',
          className: 'text-center text-nowrap',
          data: 'correo',
        },
        {
          title: 'NOMBRE TIENDA',
          className: 'text-center text-nowrap',
          data: 'nombre_tienda',
        },
        {
          title: 'NOMBRE TENDERO',
          className: 'text-center text-nowrap',
          data: 'nombre_tendero',
        },
        {
          title: 'MUNICIPIO',
          className: 'text-center text-nowrap',
          data: 'municipio[0].municipio',
        },
        {
          title: 'NIT',
          className: 'text-center text-nowrap',
          data: 'nit',
        },
      ],
      pagingType: 'full_numbers',
      lengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, 'Todos'],
      ],
      responsive: true,
      ordering: false,
      language: {
        url: '../../../assets/plugins/datatables.net/language/Spanish.json',
      },
    });
    this.listarUsuarios();
  }
}

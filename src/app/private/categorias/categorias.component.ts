import { Component, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { CategoriasService } from './service/categorias.service';
import { CategoriasTO } from './service/categoriasto.interface';
import { DataTablesModule } from 'angular-datatables';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class CategoriasComponent implements OnInit {
  constructor(
    private titleService: Title,
    private _categoriasService: CategoriasService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  @ViewChild('ModalRegistro', { static: false }) ModalRegistro: any;
  listaCategorias: CategoriasTO[] = new Array<CategoriasTO>();
  categoria: CategoriasTO = new CategoriasTO();
  dtOptions: any = {};
  tituloModal: any;
  buttonModal: any;
  edit: any;

  openModal(modal: any, tipo: number) {
    switch (tipo) {
      case 1:
        this.tituloModal = 'Crear Categoria';
        this.buttonModal = 'Crear';
        this.edit = false;
        break;
      case 2:
        this.tituloModal = 'Ver Categoria';
        this.buttonModal = '';
        this.edit = '';
        break;
      case 3:
        this.tituloModal = 'Editar Categoria';
        this.buttonModal = 'Editar';
        this.edit = true;
        break;
      default:
        break;
    }
    this.modalService.open(modal).result.then(
      (result) => {
        this.categoria = new CategoriasTO();
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  listarCategorias() {
    $('.overlayCargue').show();
    this._categoriasService.listarCategorias().subscribe((data) => {
      console.log(data);
      data.forEach((element) => {
        element.fecha_actualizacion =
          element.fecha_actualizacion != null
            ? moment(element.fecha_actualizacion).locale('es').format('LLLL')
            : element.fecha_actualizacion;
        element.fecha_creacion =
          element.fecha_creacion != null
            ? moment(element.fecha_creacion).locale('es').format('LLLL')
            : element.fecha_creacion;
        element.estado_nombre =
          element.estado == 1
            ? '<span class="badge badge-success">ACTIVO</span>'
            : '<span class="badge badge-danger">INACTIVO</span>';
        element.acciones = `<i class="ik ik-eye fa-lg ver" style="cursor: pointer;" title="Ver"></i>
        <i class="ik ik-edit-2 fa-lg editar" style="cursor: pointer;margin-left:5px;" title="Editar"></i>
        <i class="ik ik-repeat fa-lg cambiar" style="cursor: pointer;margin-left:5px;" title="Cambiar Estado"></i>`;
      });
      $('#dttableCategorias').DataTable().clear();
      $('#dttableCategorias').DataTable().rows.add(data).draw();
      $('#dttableCategorias').DataTable().columns.adjust().draw();
    });

    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  verCategoria(id: string, tipo: number) {
    $('.overlayCargue').show();
    this._categoriasService.datosCategoria(id).subscribe((data) => {
      this.categoria = data;
      this.openModal(this.ModalRegistro, tipo);
    });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  editarCategoria() {
    $('.overlayCargue').show();
    this._categoriasService
      .actualizarCategoria(this.categoria)
      .subscribe((data) => {
        this.categoria = new CategoriasTO();
        this.listarCategorias();
        this.modalService.dismissAll();
      });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  crearCategoria() {
    $('.overlayCargue').show();
    this._categoriasService.crearCategoria(this.categoria).subscribe((data) => {
      this.categoria = new CategoriasTO();
      this.listarCategorias();
      this.modalService.dismissAll();
    });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  cambiarEstado(id: string, estado: number) {
    this.categoria._id = id;
    this.categoria.estado = estado == 1 ? 2 : 1;
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Cambiaras el estado de la Categoria!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        $('.overlayCargue').show();
        this._categoriasService
          .actualizarCategoria(this.categoria)
          .subscribe((data) => {
            this.listarCategorias();
          });
        setTimeout(() => {
          $('.overlayCargue').hide();
        }, 1500);
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Categorias');
    $('#dttableCategorias').DataTable({
      columns: [
        {
          title: 'CATEGORIA',
          className: 'text-center text-nowrap',
          data: 'descripcion',
        },
        {
          title: 'ESTADO',
          className: 'text-center text-nowrap',
          data: 'estado_nombre',
        },
        {
          title: 'FECHA<br>CREACION',
          className: 'text-center text-nowrap',
          data: 'fecha_creacion',
        },
        {
          title: 'FECHA<br>ACTUALIZACION',
          className: 'text-center text-nowrap',
          data: 'fecha_actualizacion',
        },
        {
          title: 'ACCIONES',
          className: 'text-center text-nowrap',
          data: 'acciones',
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
      createdRow: (row: Node, data: any | Object, index: number) => {
        $(row)
          .find('.ver')
          .off('click')
          .on('click', () => {
            this.verCategoria('' + data._id + '', 2);
          });
        $(row)
          .find('.editar')
          .off('click')
          .on('click', () => {
            this.verCategoria('' + data._id + '', 3);
          });
        $(row)
          .find('.cambiar')
          .off('click')
          .on('click', () => {
            this.cambiarEstado('' + data._id + '', data.estado);
          });
      },
    });
    this.listarCategorias();
  }
}

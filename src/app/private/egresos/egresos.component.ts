import { Component, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { EgresosService } from './service/egresos.service';
import { EgresosTO } from './service/egresosto.interface';
import { DataTablesModule } from 'angular-datatables';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from '../categorias/service/categorias.service';
import { CategoriasTO } from '../categorias/service/categoriasto.interface';
import { ProductosService } from '../productos/service/productos.service';
import { ProductosTO } from '../productos/service/productosto.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class EgresosComponent implements OnInit {
  constructor(
    private titleService: Title,
    private _egresosService: EgresosService,
    private _categoriasService: CategoriasService,
    private _productosService: ProductosService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  @ViewChild('ModalRegistro', { static: false }) ModalRegistro: any;
  listaEgresos: EgresosTO[] = new Array<EgresosTO>();
  egreso: EgresosTO = new EgresosTO();
  listaCategorias: CategoriasTO[] = new Array<CategoriasTO>();
  categoria: CategoriasTO = new CategoriasTO();
  listaProductos: ProductosTO[] = new Array<ProductosTO>();
  producto: ProductosTO = new ProductosTO();
  dtOptions: any = {};
  tituloModal: any;
  buttonModal: any;
  edit: any;

  openModal(modal: any, tipo: number) {
    switch (tipo) {
      case 1:
        this.tituloModal = 'Crear Egreso';
        this.buttonModal = 'Crear';
        this.edit = false;
        break;
      case 2:
        this.tituloModal = 'Ver Egreso';
        this.buttonModal = '';
        this.edit = '';
        break;
      case 3:
        this.tituloModal = 'Editar Egreso';
        this.buttonModal = 'Editar';
        this.edit = true;
        break;
      default:
        break;
    }
    this.modalService.open(modal).result.then(
      (result) => {
        this.egreso = new EgresosTO();
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  listarEgresos() {
    $('.overlayCargue').show();
    this._egresosService.listarEgresos().subscribe((data) => {
      data.forEach((element) => {
        element.fecha_actualizacion =
          element.fecha_actualizacion != null
            ? moment(element.fecha_actualizacion).locale('es').format('LLLL')
            : element.fecha_actualizacion;
        element.fecha_creacion =
          element.fecha_creacion != null
            ? moment(element.fecha_creacion).locale('es').format('LLLL')
            : element.fecha_creacion;
        element.acciones = `<i class="ik ik-eye fa-lg ver" style="cursor: pointer;" title="Ver"></i>
        <i class="ik ik-edit-2 fa-lg editar" style="cursor: pointer;margin-left:5px;" title="Editar"></i>
        <i class="ik ik-trash fa-lg eliminar" style="cursor: pointer;margin-left:5px;" title="Eliminar"></i>`;
      });
      $('#dttableEgresos').DataTable().clear();
      $('#dttableEgresos').DataTable().rows.add(data).draw();
      $('#dttableEgresos').DataTable().columns.adjust().draw();
    });

    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  listarCategorias() {
    this._categoriasService.listarCategorias().subscribe((data) => {
      this.listaCategorias = data;
    });
  }

  listarProductosxCateogoria() {
    this._productosService
      .listarProductosxCategoria({
        categoria: this.categoria._id,
      })
      .subscribe((data) => {
        this.listaProductos = data;
      });
  }

  verEgreso(id: string, tipo: number) {
    $('.overlayCargue').show();
    this._egresosService.datosEgreso(id).subscribe((data) => {
      this.egreso = data;
      this.categoria._id = data.producto[0].categoria[0]._id;
      this.listarProductosxCateogoria();
      this.egreso.producto = data.producto[0]._id;
      this.openModal(this.ModalRegistro, tipo);
    });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  editarEgreso() {
    $('.overlayCargue').show();
    this._egresosService.actualizarEgreso(this.egreso).subscribe((data) => {
      this.egreso = new EgresosTO();
      this.listarEgresos();
      this.modalService.dismissAll();
    });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  crearEgreso() {
    $('.overlayCargue').show();
    this._egresosService.crearEgreso(this.egreso).subscribe((data) => {
      this.egreso = new EgresosTO();
      this.listarEgresos();
      this.modalService.dismissAll();
    });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  eliminarEgreso(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Eliminaras un egreso!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        $('.overlayCargue').show();
        this._egresosService.eliminarEgreso(id).subscribe((data) => {
          this.listarEgresos();
        });
        setTimeout(() => {
          $('.overlayCargue').hide();
        }, 1500);
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Egresos');
    $('#dttableEgresos').DataTable({
      columns: [
        {
          title: 'CATEGORIA',
          className: 'text-center text-nowrap',
          data: 'producto[0].categoria[0].descripcion',
        },
        {
          title: 'PRODUCTO',
          className: 'text-center text-nowrap',
          data: 'producto[0].descripcion',
        },
        {
          title: 'VALOR COMPRA',
          className: 'text-center text-nowrap',
          data: 'valor_compra',
        },
        {
          title: 'CANTIDAD',
          className: 'text-center text-nowrap',
          data: 'cantidad',
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
            this.verEgreso('' + data._id + '', 2);
          });
        $(row)
          .find('.editar')
          .off('click')
          .on('click', () => {
            this.verEgreso('' + data._id + '', 3);
          });
        $(row)
          .find('.eliminar')
          .off('click')
          .on('click', () => {
            this.eliminarEgreso('' + data._id + '');
          });
      },
    });
    this.listarEgresos();
    this.listarCategorias();
  }
}

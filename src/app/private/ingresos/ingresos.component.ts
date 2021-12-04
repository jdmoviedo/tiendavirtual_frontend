import { Component, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { IngresosService } from './service/ingresos.service';
import { IngresosTO } from './service/ingresosto.interface';
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
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class IngresosComponent implements OnInit {
  constructor(
    private titleService: Title,
    private _ingresosService: IngresosService,
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
  listaIngresos: IngresosTO[] = new Array<IngresosTO>();
  ingreso: IngresosTO = new IngresosTO();
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
        this.tituloModal = 'Crear Ingreso';
        this.buttonModal = 'Crear';
        this.edit = false;
        break;
      case 2:
        this.tituloModal = 'Ver Ingreso';
        this.buttonModal = '';
        this.edit = '';
        break;
      case 3:
        this.tituloModal = 'Editar Ingreso';
        this.buttonModal = 'Editar';
        this.edit = true;
        break;
      default:
        break;
    }
    this.modalService.open(modal).result.then(
      (result) => {
        this.ingreso = new IngresosTO();
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  listarIngresos() {
    $('.overlayCargue').show();
    this._ingresosService.listarIngresos().subscribe((data) => {
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
      $('#dttableIngresos').DataTable().clear();
      $('#dttableIngresos').DataTable().rows.add(data).draw();
      $('#dttableIngresos').DataTable().columns.adjust().draw();
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

  verIngreso(id: string, tipo: number) {
    $('.overlayCargue').show();
    this._ingresosService.datosIngreso(id).subscribe((data) => {
      this.ingreso = data;
      this.categoria._id = data.producto[0].categoria[0]._id;
      this.listarProductosxCateogoria();
      this.ingreso.producto = data.producto[0]._id;
      this.openModal(this.ModalRegistro, tipo);
    });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  editarIngreso() {
    $('.overlayCargue').show();
    this._ingresosService.actualizarIngreso(this.ingreso).subscribe((data) => {
      this.ingreso = new IngresosTO();
      this.listarIngresos();
      this.modalService.dismissAll();
    });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  crearIngreso() {
    $('.overlayCargue').show();
    this._ingresosService.crearIngreso(this.ingreso).subscribe((data) => {
      this.ingreso = new IngresosTO();
      this.listarIngresos();
      this.modalService.dismissAll();
    });
    setTimeout(() => {
      $('.overlayCargue').hide();
    }, 1500);
  }

  eliminarIngreso(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Eliminaras un ingreso!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        $('.overlayCargue').show();
        this._ingresosService.eliminarIngreso(id).subscribe((data) => {
          this.listarIngresos();
        });
        setTimeout(() => {
          $('.overlayCargue').hide();
        }, 1500);
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Ingresos');
    $('#dttableIngresos').DataTable({
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
          title: 'VALOR VENTA',
          className: 'text-center text-nowrap',
          data: 'valor_venta',
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
            this.verIngreso('' + data._id + '', 2);
          });
        $(row)
          .find('.editar')
          .off('click')
          .on('click', () => {
            this.verIngreso('' + data._id + '', 3);
          });
        $(row)
          .find('.eliminar')
          .off('click')
          .on('click', () => {
            this.eliminarIngreso('' + data._id + '');
          });
      },
    });
    this.listarIngresos();
    this.listarCategorias();
  }
}

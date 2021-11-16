import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { VentasService } from '../../services/ventas/ventas.service';
import * as moment from 'moment';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementComponent } from './dialog-element.component';

export interface IVenta {
  id: number;
  cliente: ICliente;
  fecha: number;
}

export interface ICliente {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email: string;
}

export interface IProducto {
  id: number;
  nombre: string;
  precio: number;
}

export interface IDetalle {
  venta: IVenta;
  producto: IProducto;
  cantidad: string;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  formVentas: FormGroup;
  formSearch: FormGroup;
  displayedColumns: string[] = ['id', 'cliente', 'fecha', 'action'];
  listVentas: IVenta[] = [];
  lisClientes: ICliente[] = [];
  listProductos: IProducto[] = [];
  listDetalleVentas: IDetalle[] = [];
  showRegister: boolean = false;
  showSearch: boolean = false;
  @ViewChild(MatTable)
  table!: MatTable<IVenta>;

  constructor(
    private ventasService: VentasService,
    private clientesService: ClientesService,
    private productosService: ProductosService,
    public dialog: MatDialog
  ) {
    this.formVentas = new FormGroup({
      idCliente: new FormControl('', [Validators.required]),
      idProducto: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required])
    });

    this.formSearch = new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
      idVenta: new FormControl()
    });
  }

  ngOnInit(): void {
    this.callListarVentas();
    this.callListarClientes();
    this.callListarProductos();
    this.callListarDetalleVntas();
  }

  callListarVentas() {
    this.ventasService.listVentas().subscribe(x => {
      if (x && x.length > 0) this.listVentas = x;
    });
  }

  callListarDetalleVentas() {

  }

  callListarClientes() {
    this.clientesService.listCliente().subscribe(x => {
      this.lisClientes = x;
    })
  }

  callListarProductos() {
    this.productosService.listProductos().subscribe(x => {
      this.listProductos = x;
    });
  }

  callListarDetalleVntas() {
    this.ventasService.listDetalleVentas().subscribe(x => {
      this.listDetalleVentas = x;
    });
  }

  saveVenta() {
    const requestVenta  = {
      cliente: this.formVentas.get('idCliente')?.value,
      fecha: moment()
    };
    this.ventasService.saveVenta(requestVenta).subscribe(x => {
      const requestDetalle = {
        venta: x,
        producto: this.formVentas.get('idProducto')?.value,
        cantidad: this.formVentas.get('cantidad')?.value
      };
      this.showRegister = false;
      this.formVentas.reset();
      this.listVentas.push(x);
      this.table.renderRows();
      this.ventasService.saveDetalleventa(requestDetalle).subscribe(Y => {
      });
    });
  }

  showDetail(element: any) {
    const getDetailByRow =  this.listDetalleVentas.find(a => {
      return a.venta.id === element.id
    });
    console.log('ROW', element);
    console.log('find', getDetailByRow);
    this.dialog.open(DialogElementComponent, {
      data: {
        ...element,
        ...getDetailByRow
      },
    });
  }

  goToSearchVenta() {

  }

  showRegistryForm(value: boolean) {
    this.showRegister = value;
  }

  showSearchForm(value: boolean) {
    this.showSearch = value;
  }

}

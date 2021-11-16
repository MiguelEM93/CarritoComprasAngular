import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ProductosService } from 'src/app/services/productos/productos.service';

export interface PeriodicElement {
  id: number;
  nombre: string;
  precio: number
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductosComponent implements OnInit {

  formProductos: FormGroup;
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'action'];
  listProductos: PeriodicElement[] = [];
  showRegister: boolean = false;
  @ViewChild(MatTable)
  table!: MatTable<PeriodicElement>;

  constructor(
    private productosService: ProductosService
  ) {
    this.formProductos = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.callListarProductos();
  }

  saveProducto() {
    const {nombre , precio, id} = this.formProductos.value;
    const payload = {
      nombre,
      precio, 
      id
    };
    this.productosService.saveProducto(payload).subscribe(x => {
      this.formProductos.reset();
      this.hideForm();
      this.listProductos.push(x);
      this.table.renderRows();
    });    
  }

  callListarProductos() {
    this.productosService.listProductos().subscribe(x => {
      this.listProductos = x;
    })
  }

  editProduct(product: any) {
    this.showRegister = true;
    this.formProductos.setValue({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio
    });
  }

  deleteProduct(producto: any, index: number) {
    this.productosService.deleteProducto(producto.id).subscribe( x => {
      if(x === true) {
        this.listProductos.splice(index, 1);
        console.log(this.listProductos);
        this.table.renderRows();
      }
    });
  }

  showForm() {
    this.showRegister = true;
  }
  hideForm() {
    this.showRegister = false;
  }

}

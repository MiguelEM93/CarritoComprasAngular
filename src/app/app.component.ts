import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Evalucion Carrito de Compras';

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  redirectToVentas() {
    this.router.navigate(['/ventas']);
  }

  redirectToClientes() {
    this.router.navigate(['/clientes']);
  }

  redirectToProductos() {
    this.router.navigate(['/productos']);
  }
}

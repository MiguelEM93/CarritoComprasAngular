import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { DetalleVentasComponent } from './pages/detalle-ventas/detalle-ventas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const routes: Routes = [
  { path: 'clientes', component:  ClientesComponent},
  { path: 'detalle-venta', component:  DetalleVentasComponent},
  { path: 'productos', component:  ProductosComponent},
  { path: 'ventas', component:  VentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

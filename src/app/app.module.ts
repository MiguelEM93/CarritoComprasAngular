import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VentasService } from './services/ventas/ventas.service';
import { ProductosService } from './services/productos/productos.service';
import { DetalleVentasService } from './services/detalleVentas/detalle-ventas.service';
import { ClientesService } from './services/clientes/clientes.service';
import { MatButtonModule } from '@angular/material/button';
import { ProductosComponent } from './pages/productos/productos.component';
import { DetalleVentasComponent } from './pages/detalle-ventas/detalle-ventas.component';
import { VentasComponent } from './pages/ventas/ventas.component'
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ServiceApiService } from './services/service-api/service-api.service';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogElementComponent } from './pages/ventas/dialog-element.component';

const SERVICES: any[] = [
  VentasService,
  ProductosService,
  DetalleVentasService,
  ClientesService,
  ServiceApiService
];

const MATERIAL_MODULES: any[] = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
];

const MODULE: any[] = [
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductosComponent,
    DetalleVentasComponent,
    VentasComponent,
    DialogElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...MODULE,
    ...MATERIAL_MODULES
  ],
  providers: [
    ...SERVICES,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

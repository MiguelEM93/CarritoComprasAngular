import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceApiService } from '../service-api/service-api.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(
    private apiService: ServiceApiService
  ) {}

  listVentas(params: any = {}): Observable<any> {
    return this.apiService.get(`/ventas/lista`);
  }

  saveVenta(params: any): Observable<any> {
    return this.apiService.post(`/ventas/save`, params)
  }

  listDetalleVentas(params: any = {}): Observable<any> {
    return this.apiService.get(`/detalle-venta/lista`);
  }

  saveDetalleventa(params: any): Observable<any> {
    return this.apiService.post(`/detalle-venta/save`, params)
  }

}

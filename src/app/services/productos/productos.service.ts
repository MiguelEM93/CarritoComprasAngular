import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceApiService } from '../service-api/service-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private apiService: ServiceApiService
  ) {}

  listProductos(params: any = {}): Observable<any> {
    return this.apiService.get(`/productos/lista`);
  }

  saveProducto(params: any): Observable<any> {
    return this.apiService.post(`/productos/save`, params)
  }

  ediProducto(id: any): Observable<any> {
    return this.apiService.put(`/productos/editar/${id}`);
  }

  deleteProducto(id: any): Observable<any> {
    return this.apiService.delete(`/productos/eliminar/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceApiService } from '../service-api/service-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private apiService: ServiceApiService
  ) {}

  listCliente(params: any = {}): Observable<any> {
    return this.apiService.get(`/clientes/lista`);
  }

  saveCliente(params: any): Observable<any> {
    return this.apiService.post(`/clientes/save`, params)
  }
}

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

export interface PeriodicElement {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientesComponent implements OnInit {

  formClientes: FormGroup;
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dni', 'telefono', 'email'];
  lisClientes: PeriodicElement[] = [];
  showRegister: boolean = false;
  @ViewChild(MatTable)
  table!: MatTable<PeriodicElement>;

  constructor(
    private clientesService: ClientesService
  ) {
    this.formClientes = new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
    this.callListarClientes();
  }

  saveCliente() {
    const {nombres , apellidos, dni, telefono, email} = this.formClientes.value;
    const payload = {
      nombres,
      apellidos,
      dni,
      email,
      telefono
    };
    this.clientesService.saveCliente(payload).subscribe(x => {
      this.formClientes.reset();
      this.hideForm();
      this.lisClientes.push(x);
      this.table.renderRows();
    });    
  }

  callListarClientes() {
    this.clientesService.listCliente().subscribe(x => {
      this.lisClientes = x;
    })
  }

  showForm() {
    this.showRegister = true;
  }

  hideForm() {
    this.showRegister = false;
  }
}

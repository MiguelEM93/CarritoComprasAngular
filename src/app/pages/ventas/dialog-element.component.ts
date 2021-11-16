import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ICliente, IProducto, IVenta } from "./ventas.component";
import * as _ from 'ramda'

export interface DialogData {
    cantidad: string;
    cliente: ICliente;
    fecha: string;
    id: number;
    producto: IProducto;
    venta: IVenta;
}

export interface IData {
    cantidad: string;
    nombre: string;
    precio: number;
    fecha: string;
}

@Component({
    selector: 'dialog-element',
    templateUrl: 'dialog-element.component.html',
    styleUrls: ['./dialog-element.component.scss']
})
export class DialogElementComponent implements OnInit {

    displayedColumns: string[] = ['producto', 'unitPrice', 'cantidad', 'subtotal'];
    listToTable: IData[] = [];
    totalAmount: string = '';
    arrPrecio: number[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {
        const {cantidad, fecha, producto: {nombre, precio}} = this.data;
        this.listToTable.push({cantidad, nombre, precio, fecha});
    }

    calculateTotal(): number {
        let arr: number[] = [];
        if(this.listToTable.length > 0) {
            this.listToTable.forEach(x => {
                arr.push(x.precio);
            });
            return _.sum(arr);
        } else {
            return 0;
        }
    }

}
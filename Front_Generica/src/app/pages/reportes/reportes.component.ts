import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  public mostrarListado= "";
  public cliente="cliente";
  public ventas="ventas";
  contenido: any;
  contenido2: any;
  res: any;
  urlapiGET: string = "http://localhost:8080/api/clientes";
  urlVentasGET: string = "http://localhost:8080/api/reporte";
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  constructor(private objetohttp: HttpClient) { }

  ngOnInit(): void {
    try { 
      this.res = this.objetohttp.get(this.urlapiGET);
      this.res.subscribe((datos: any[]) => {
        this.contenido = datos;
        console.log(this.contenido);
      });
      this.res = this.objetohttp.get(this.urlVentasGET);
      this.res.subscribe((datos: any[]) => {
        this.contenido2 = datos;
        console.log(this.contenido2);
      });
    }
    catch (e) {
      console.error("BK DOWN");
      this.contenido=[]
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      columns: [{
        title: 'CÉDULA',
      },
      {
        title: 'NOMBRE',
      },
      {
        title: 'DIRECCIÓN',
      },
      {
        title: 'TELÉFONO',
      },
      {
        title: 'EMAIL',
      },
      ],
      pageLength: 10,
      responsive: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };

    this.dtOptions2 = {
      pagingType: 'full_numbers',
      columns: [{
        title: 'CÉDULA',
      },
      {
        title: 'NOMBRE',
      },
      {
        title: 'TOTAL VENTA',
      },
      
      ],
      pageLength: 10,
      responsive: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
  }

  listadoCliente(){
    if (this.mostrarListado == this.cliente){
      this.mostrarListado = "";
    }else{
      this.mostrarListado = this.cliente;
    }
  }
    
  ventasCliente(){
    if (this.mostrarListado == this.ventas){
      this.mostrarListado = "";
    }else{
      this.mostrarListado = this.ventas;
    }
  }

 



}

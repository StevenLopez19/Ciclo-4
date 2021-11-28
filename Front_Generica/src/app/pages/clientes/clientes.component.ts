import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientesService } from './clientes.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {


  //Función constructora
  constructor(private objetohttp: HttpClient, private clientesService:ClientesService, private toastr:ToastrService) { }

  ///////////////// GET /////////////////////////////
  //opciones y objeto revisor de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //variable receptora de documentos
  res: any;
  //variable contenedora de contenidos
  contenido: any;
  //url api get
  urlapiGET: string = "http://localhost:8080/api/clientes";

  //aliminando objeto revisor de cambios de la tabla
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  //FUNCIÓN DE EJECUCIÓN ANTES DE LA CARGA DE LA PAGINA
  ngOnInit(): void {
    try { 
      this.res = this.objetohttp.get(this.urlapiGET);
      this.res.subscribe((datos: any[]) => {
        this.contenido = datos;
        console.log(this.contenido);
        this.dtTrigger.next(this.dtOptions);
      });
    }
    catch (e) {
      console.error("BK DOWN");
      this.contenido=[]
    }


    //Opciones especiales de la tabla, localización y caracteristicas
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
  }



    
  //POST// 
  cedulacliente:"";
  nombrecliente:"";
  direccioncliente:"";
  telefonocliente:"";
  emailcliente:"";
  cc:"";
  codigorespuesta:number



  crearCliente(){
  this.objetohttp.post<any>(
    "http://localhost:8080/api/clientes",
    {
      "cedulacliente":this.cedulacliente,
      "nombrecliente":this.nombrecliente,
      "direccioncliente":this.direccioncliente,
      "telefonocliente":this.telefonocliente,
      "emailcliente":this.emailcliente
    },
    {observe:'response'}
    ).subscribe(response=>{
      this.codigorespuesta=response.status;
  });
  console.log(this.codigorespuesta);
  this.showNotification('top','center',1);
  window.location.reload();
}

//GET BUSCAR//
buscarCliente(){
this.clientesService.buscar(this.cedulacliente).subscribe((cliente:any[])=>{
console.log(cliente);

this.nombrecliente=cliente[0].nombrecliente;
this.direccioncliente=cliente[0].direccioncliente;
this.telefonocliente=cliente[0].telefonocliente;
this.emailcliente=cliente[0].emailcliente;

});
}




actualizarCliente(){
let cliente={
  cedulacliente:this.cedulacliente,
  nombrecliente:this.nombrecliente,
  direccioncliente:this.direccioncliente,
  telefonocliente:this.telefonocliente,
  emailcliente:this.emailcliente
};

this.clientesService.actualizar(this.cedulacliente,cliente).subscribe((cliente)=>{
  this.nombrecliente="";
  this.direccioncliente="";
  this.telefonocliente="";
  this.emailcliente="";

  this.showNotification('top','center',3);
  this.nombrecliente="";
  this.direccioncliente="";
  this.telefonocliente="";
  this.emailcliente="";
  window.location.reload();

})
}


//DELETE//
borrarCliente(){
this.clientesService.borrar(this.cedulacliente).subscribe(()=>{
  this.cedulacliente="";
  this.showNotification('top','center',2);
  window.location.reload();
})
}

showNotification(from, align,type) {
  switch (type) {
    case 1:
      this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Cliente Creado con éxito</b>', '', {
        disableTimeOut: false,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-success alert-with-icon',
        positionClass: 'toast-' + from + '-' + align
      });
      break;
    case 2:
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Cliente elimiando con éxito</b>', '', {
        disableTimeOut: false,
        enableHtml: true,
        closeButton: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-' + from + '-' + align
      });
      break;
      case 3:
        this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>Cliente actualizado con éxito</b>', '', {
          disableTimeOut: false,
          enableHtml: true,
          closeButton: true,
          toastClass: 'alert alert-warning alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
    default:
      break;

}
}
}


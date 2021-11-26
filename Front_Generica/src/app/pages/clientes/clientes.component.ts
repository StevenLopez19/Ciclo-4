import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ArrayType } from "@angular/compiler";
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(
  private objetohttp: HttpClient, private formBuilder: FormBuilder)
  { }

  public clienteForm : FormGroup;
  dtOptions: DataTables.Settings = {
    pagingType: "full_numbers",
    columns: [
      {
        title: "Cédula",
      },
      {
        title: "Nombre",
      },
      {
        title: "Dirección",
      },
      {
        title: "Teléfono",
      },
      {
        title: "Email",
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
        last: "Último",
      },
      aria: {
        sortAscending: ": Activar para ordenar la tabla en orden ascendente",
        sortDescending:
          ": Activar para ordenar la tabla en orden descendente",
      },
    },
  };;
  dtTrigger: Subject<any> = new Subject<any>();

  //variable receptora de documentos
  res: any;
  //variable contenedora de contenidos
  contenido: any;
  //url api get
  urlapiGET: string = "http://localhost:8080/api/clientes";

  //FUNCIÓN DE CONTROL DE ERRORES
  handleError(error: HttpErrorResponse) {
    let errorMessage = "Error desconocido!";
    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente
      errorMessage = `Error: ${error.error.message}\n ${error.status}`;
    } else {
      // Errores del lado del servidor
      errorMessage = `Codigo de Error: ${error.status} \nMensaje: ${error.message}`;
    }
    //MOSTRANDO UN ERROR EN UNA ALERTA
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  //eliminando objeto revisor de cambios de la tabla
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crearCliente(){

    console.log(this.clienteForm.value)
    let nuevoCliente=this.clienteForm.value
    if (nuevoCliente.nombrecliente!=""&&nuevoCliente.cedulacliente!=null&&nuevoCliente.direccioncliente!=""
    &&nuevoCliente.telefonocliente!=null&&nuevoCliente.emailcliente!=""){
    console.log(this.contenido[this.contenido.length-1]._id+1)
    nuevoCliente._id=this.contenido[this.contenido.length-1]._id+1
    this.contenido.push(nuevoCliente)
    this.clienteForm.reset()
    console.log(this.contenido)

    }

  }

  consultarClientes(cliente){
    console.log("consultar clientes")
    this.clienteForm.patchValue(cliente)

  }

  actualizarClientes(){
    console.log("actualizar clientes")
    let cliente=this.clienteForm.value
    if(cliente._id) {
      var index = this.contenido.findIndex(item => item._id == cliente._id);
      if(index >= 0) {
        this.contenido[index] = cliente;
      }
    }
    this.clienteForm.reset()
  }

  borrarClientes(){
    console.log("borrar clientes")
    let cliente=this.clienteForm.value
    if(cliente._id) {
      var index = this.contenido.findIndex(item => item._id == cliente._id);
      if (index >= 0) {
        this.contenido.splice(index, 1)
      }
    }
    this.clienteForm.reset()
  }


  ///////////////// METODOS ANGULAR /////////////////////////////

  //FUNCIÓN DE EJECUCIÓN ANTES DE LA CARGA DE LA PAGINA
  ngOnInit(): void {
    this.clienteForm=this.formBuilder.group({
      _id:[""],
      cedulacliente:[""],
      emailcliente:[""],
      telefonocliente:[""],
      direccioncliente:[""],
      nombrecliente:[""]
    })
    //utilizando el servicio en la url
    this.res = this.objetohttp
      .get(this.urlapiGET)
      .pipe(catchError(this.handleError));

    //suscribe el archivo json y lo convierte
    this.res.subscribe((datos: any[]) => {

      console.log(this.contenido);

    });

    this.contenido =  [
      {
        _id: 1,
        cedulacliente: 123,
        nombrecliente: "Nombre1",
        direccioncliente: "calle 1",
        telefonocliente: 435234,
        emailcliente: "correo@fsdfasd"
      },
      {
        _id: 2,
        cedulacliente: 123,
        nombrecliente: "Nombre1",
        direccioncliente: "calle 1",
        telefonocliente: 435234,
        emailcliente: "correo@fsdfasd"
      },
      {
        _id: 3,
        cedulacliente: 52222854,
        nombrecliente: "Dario",
        direccioncliente: "Carrera 30",
        telefonocliente: 313333333,
        emailcliente: "dario@gmail.com"
      },
      {
        _id: 4,
        cedulacliente: 77222555,
        nombrecliente: "Sebastian",
        direccioncliente: "Av.Villavicencio",
        telefonocliente: 444888999,
        emailcliente: "sebastian@yahoo.com"
      },
      {
        _id: 5,
        cedulacliente: 45777111,
        nombrecliente: "Sandra",
        direccioncliente: "Kra.15",
        telefonocliente: 555555555,
        emailcliente: "sandra@hotmail.com"
      }
    ]



    //Opciones especiales de la tabla, localización y caracteristicas
    this.dtOptions = {
      pagingType: "full_numbers",
      columns: [
        {
          title: "Cédula",
        },
        {
          title: "Nombre",
        },
        {
          title: "Dirección",
        },
        {
          title: "Teléfono",
        },
        {
          title: "Email",
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
          last: "Último",
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending:
            ": Activar para ordenar la tabla en orden descendente",
        },
      },
    };
    this.dtTrigger.next(this.dtOptions);
  }


  }





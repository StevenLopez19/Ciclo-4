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
    private objetohttp: HttpClient, private formBuilder: FormBuilder) { }

  public clienteForm: FormGroup;
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

  crearCliente() {

    let nuevoCliente = this.clienteForm.value
    if (nuevoCliente.nombrecliente != "" && nuevoCliente.cedulacliente != null && nuevoCliente.direccioncliente != ""
      && nuevoCliente.telefonocliente != null && nuevoCliente.emailcliente != "") {
      this.objetohttp
        .post(this.urlapiGET, nuevoCliente)
        .pipe(catchError(this.handleError)).subscribe(res =>
          console.log(res))
      this.objetohttp
        .get(this.urlapiGET)
        .pipe(catchError(this.handleError)).subscribe((datos: any[]) => {
          this.contenido = datos;
          console.log(this.contenido);

        });
      this.clienteForm.reset()

    }

  }

  consultarClientes(cliente) {
    console.log("consultar clientes")
    this.clienteForm.patchValue(cliente)

  }

  actualizarClientes() {
    console.log("actualizar clientes")
    let cliente = this.clienteForm.value
    if (cliente.id) {
      console.log(cliente.id)
      this.objetohttp
        .put(this.urlapiGET + "/id/" + cliente.id, cliente)
        .pipe(catchError(this.handleError)).subscribe(res => {
          console.log(res)
          this.objetohttp
            .get(this.urlapiGET)
            .pipe(catchError(this.handleError)).subscribe((datos: any[]) => {
              this.contenido = datos;
              console.log(this.contenido);

            });
        })
    }
    this.clienteForm.reset()
  }

  borrarClientes() {
    console.log("borrar clientes")
    let cliente = this.clienteForm.value
    if (cliente.id) {
      console.log(cliente.id)
      this.objetohttp
        .delete(this.urlapiGET + "/id/" + cliente.id)
        .pipe(catchError(this.handleError)).subscribe(res => {
          console.log(res)
          this.objetohttp
            .get(this.urlapiGET)
            .pipe(catchError(this.handleError)).subscribe((datos: any[]) => {
              this.contenido = datos;
              console.log(this.contenido);

            });
        })
    }
    this.clienteForm.reset()
  }

  buscarClientes () {
    let cliente = this.clienteForm.value;
    if (cliente.cedulacliente) {
      this.objetohttp
            .get(this.urlapiGET + "/cedula/" + cliente.cedulacliente)
            .pipe(catchError(this.handleError)).subscribe((datos: any) => {
              this.clienteForm.patchValue(datos)

            });
    }
  }


  ///////////////// METODOS ANGULAR /////////////////////////////

  //FUNCIÓN DE EJECUCIÓN ANTES DE LA CARGA DE LA PAGINA
  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      id: [""],
      cedulacliente: [""],
      emailcliente: [""],
      telefonocliente: [""],
      direccioncliente: [""],
      nombrecliente: [""]
    })
    //utilizando el servicio en la url
    this.res = this.objetohttp
      .get(this.urlapiGET)
      .pipe(catchError(this.handleError));

    //suscribe el archivo json y lo convierte
    this.res.subscribe((datos: any[]) => {
      this.contenido = datos;
      console.log(this.contenido);

    });

  }

}

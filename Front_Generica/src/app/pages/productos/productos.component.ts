import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { FileUploadService } from "./file-upload.service";
import { ArrayType } from "@angular/compiler";


@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.scss"],
})
export class ProductosComponent implements OnInit {
  //Función constructora
  constructor(
    private objetohttp: HttpClient,
    private fileUploadService: FileUploadService
  ) { }

  ///////////////// GET /////////////////////////////
  //opciones y objeto revisor de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //variable receptora de documentos
  res: any;
  //variable contenedora de contenidos
  contenido: any;
  //url api get
  urlapiGET: string = "http://localhost:8080/api/productos";
<<<<<<< HEAD
  urlapiPOST: string = "http://localhost:8080/api/productos";
=======
>>>>>>> origin/SL

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
<<<<<<< HEAD
  ngOnDestroy(): void {
=======
  ngOnDestroy(): void { 
>>>>>>> origin/SL
    this.dtTrigger.unsubscribe();
  }

  ///////////////// METODOS ANGULAR /////////////////////////////

  //FUNCIÓN DE EJECUCIÓN ANTES DE LA CARGA DE LA PAGINA
  ngOnInit(): void {
    //utilizando el servicio en la url
    this.res = this.objetohttp
      .get(this.urlapiGET)
      .pipe(catchError(this.handleError));

    //suscribe el archivo json y lo convierte
    this.res.subscribe((datos: any[]) => {
      this.contenido = datos;
      console.log(this.contenido);
      this.dtTrigger.next(this.dtOptions);
    });

    //Opciones especiales de la tabla, localización y caracteristicas
    this.dtOptions = {
<<<<<<< HEAD
      pagingType: 'all_products',
      columns: [{
        title: 'id',
      }, {
        title: 'codigo',
      }, {
        title: 'nit',
      }, {
        title: 'nombre',
      }, {
        title: 'pcompra',
      }, {
        title: 'pventa',
      }
    ],
      pageLength: 10,
      responsive: true,
=======
      pagingType: "full_numbers",
      columns: [
        {
          title: "Id",
        },
        {
          title: "Código",
        },
        {
          title: "Nombre Producto",
        },
        {
          title: "Nit Proveedor", 
        },
        {
          title: "Precio de Compra",
        },
        {
          title: "Iva Compra",
        },
        {
          title: "Precio Venta",
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
>>>>>>> origin/SL
    };
  }

  ///////////////// POST /////////////////////////////
  codigoRespuesta: number = 0;

  res2: any;

  //lista que almacenara los resultados de la insercion de cada linea
  resultados: any;

  // Variable to store shortLink from api response
  file: File= null; //variable para almacenar los datos

  //variable de confimación de recepcion de archivo
  recibido: boolean = false;

  // En caso de seleccionar archivo, escojer el primer archivo
  onChange($event: any) : void {
    this.file = $event.target.files[0];
  }
  
  // Cuando haga click, iniciar proceso de envio
  async onUpload() {
    console.log(this.file);
    this.resultados = await this.fileUploadService.upload(this.file);
    console.log(this.resultados);
<<<<<<< HEAD
 }
 
=======
  }


>>>>>>> origin/SL
}





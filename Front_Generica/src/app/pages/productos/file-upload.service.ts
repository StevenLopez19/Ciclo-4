import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosComponent } from './productos.component';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  // API url
  baseApiUrl = "http://localhost:8080/api/productos";

  //inicializando objeto http
  constructor(private http: HttpClient) { }

  //variable auxiliar que almacena resultados de cada envio
  resultados = Array();

  // Retorna un objeto observable
  upload(file: any): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      //leyendo el contenido
      var reader = new FileReader();
      reader.onloadend = (e) => {

        let lines = reader.result as string;

        let separados = lines.split("\n");

        for (let lineaactual of separados) {
          lineaactual.replace(";", ",");
          let columnas = lineaactual.split(",", 6);
          let objeto = {
            precioventa: parseInt(columnas[5]),
            ivacompra: parseInt(columnas[1]),
            preciocompra: parseInt(columnas[4]),
            nitproveedor: parseInt(columnas[2]),
            nombreproducto: columnas[3],
            codigoproducto: parseInt(columnas[0])


          }
          if (objeto.precioventa && objeto.ivacompra) {
            console.log(objeto);
            this.http.post(
              this.baseApiUrl,
              objeto,
              { observe: 'response' }).subscribe(
                (response: any) => {
                  let resaux = [];
                  resaux[0] = response.status;
                  this.resultados.push(resaux);
                }
              );
          }

        }
        
        resolve(this.resultados);
      };
      reader.readAsText(file);
    });
  }
}
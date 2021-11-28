import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl:string="http://localhost:8080/api/clientes";

  constructor(private httpObject:HttpClient) { }
  resultado=Array();

  buscar(cedulacliente:String):Observable<any[]>{
    return this.httpObject.get<any[]>(
      this.apiUrl+'/cedula/'+cedulacliente
    );
  }

  actualizar(cedulacliente:String, cliente:any){
    return this.httpObject.put(this.apiUrl+'/cedula/'+cedulacliente,cliente);
  }
      
  borrar(cedulacliente:String){
    return this.httpObject.delete(this.apiUrl+'/cedula/'+cedulacliente)
  }



  }






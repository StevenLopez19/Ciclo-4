import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  UrlapiClie:string="http://localhost:8080/api/clientes";
  apiUrl:string="http://localhost:8080/api/ventas";
  UrlProdu:string="http://localhost:8080/api/productos";

  constructor(private httpObject:HttpClient) { }
  resultado=Array();

  buscarcliente(cedulacliente:String):Observable<any[]>{
    return this.httpObject.get<any[]>(
      this.UrlapiClie+'/cedula/'+cedulacliente
    );
  }
    buscarproducto(codigoproducto:String):Observable<any[]>{
      return this.httpObject.get<any[]>(
        this.UrlProdu+'/codigo/'+codigoproducto
      );

    }
    
    }       


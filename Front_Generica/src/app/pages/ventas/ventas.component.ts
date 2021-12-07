import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { VentasService } from './ventas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  constructor( private objetohttp: HttpClient, private VentasService:VentasService, private toastr:ToastrService)  { }

  ngOnInit(): void {
  }

  cedulaclienteventas:"";
  nombreclienteventas:"";
  contenido:any;
  contenido1:any;
  codigoproducto:"";
  nombreproducto1:"";
  valortotal1:"";
  codigoproducto2:"";
  nombreproducto2:"";
  valortotal2:"";
  codigoproducto3:"";
  nombreproducto3:"";
  valortotal3:"";
  cc:"";
  codigorespuesta:number
  
    buscarClienteV(){
      this.VentasService.buscarcliente(this.cedulaclienteventas).subscribe((cliente:any[])=>{
        this.contenido=cliente;
      console.log(this.contenido);
      this.nombreclienteventas=this.contenido.nombrecliente;
      
      });
      }

      buscarProducto(){
        this.VentasService.buscarproducto(this.codigoproducto).subscribe((producto:any[])=>{
          this.contenido1=producto;
        console.log(this.contenido1);
        this.nombreproducto1=this.contenido1[0].nombreproducto;
        this.valortotal1=this.contenido1[0].precioventa;
        
        });
        }
  
        buscarProducto2(){
          this.VentasService.buscarproducto(this.codigoproducto2).subscribe((producto:any[])=>{
            this.contenido1=producto;
          console.log(this.contenido1);
          this.nombreproducto2=this.contenido1[0].nombreproducto;
          this.valortotal2=this.contenido1[0].precioventa;
          
          });
          }

          buscarProducto3(){
            this.VentasService.buscarproducto(this.codigoproducto3).subscribe((producto:any[])=>{
              this.contenido1=producto;
            console.log(this.contenido1);
            this.nombreproducto3=this.contenido1[0].nombreproducto;
            this.valortotal3=this.contenido1[0].precioventa;
            
            });
            }
  }



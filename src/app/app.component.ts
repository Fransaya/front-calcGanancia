import { Component,OnInit } from '@angular/core';
import { FormBuilder , FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet, } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'front-calcularganancias';

  public formGanancia:FormGroup;

  public formEnvio: FormGroup;

  public precioEnvioProd:number=0;

  public precioProducto:number=0;

  constructor(private formbuilder: FormBuilder){
    this.formGanancia = this.formbuilder.group({
      costoTotalProducto:'',
      cantidadTotalProducto:'',
      gananciaEsperada:''
    });

    this.formEnvio = this.formbuilder.group({
      cantidadTotalProductos:'',
      costoTotalEnvios:''
    });
  }

  ngOnInit(): void {
    
  };

  public calcGastoEnvio(){
    let totalProductos =  this.formEnvio.value.cantidadTotalProductos;
    let costoTotal = this.formEnvio.value.costoTotalEnvios;

    if(totalProductos>=0 && costoTotal >=0){
      this.precioEnvioProd =  costoTotal / totalProductos;
      this.precioEnvioProd= Math.ceil(this.precioEnvioProd);
    }else{
      Swal.fire("Error", "debe ingresar un costo / total mayor a 0", "error");
    }
  };

  public calcGanancia(){
    let ganaciaEsperada =  this.formGanancia.value.gananciaEsperada;
    let cantProductos = this.formGanancia.value.cantidadTotalProducto;
    let precioTotal = this.formGanancia.value.costoTotalProducto;
    if(ganaciaEsperada>0 && cantProductos>0 && precioTotal>0){
      let precioXunidad = precioTotal / cantProductos;
      if(precioXunidad>0){
        this.precioProducto = (((ganaciaEsperada+100) * (precioXunidad-this.precioEnvioProd)) / 100) ;
        this.precioProducto = Math.ceil(this.precioProducto)
      }

    }else{
      Swal.fire("Error", "debe ingresar un costo / total / ganancia mayor a 0", "error");
    }

  }

}

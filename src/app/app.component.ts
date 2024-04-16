import { Component,OnInit } from '@angular/core';
import { FormBuilder , FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet, } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,ReactiveFormsModule, InputNumberModule],
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
      Swal.fire({
        html:`<h2>Costo de envio</h2>
        <p>El costo de envio de cada producto es de $<b>${this.precioEnvioProd}</b> pesos.</p>
        <span>Si desea que el precio del envio sea tenido en cuenta a la hora de realizar el calculo del precio del producto presione <b>Aceptar</b> sino <b>Cancelar</b></span>`,
        showCancelButton:true,
        confirmButtonText:"Aceptar",
        cancelButtonText:"Cancelar",
      }).then((result)=>{
        if(result.isConfirmed){
          //? apreto el boton de confirmar en el modal
          this.formEnvio.reset();

        }else if (result.dismiss === Swal.DismissReason.cancel){
          //? apreto el boton de cancelar en el modal
          this.precioEnvioProd=0;
        }
      })
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
        this.precioProducto = (((ganaciaEsperada+100) * (precioXunidad+this.precioEnvioProd)) / 100) ;
        this.precioProducto = Math.ceil(this.precioProducto)
        Swal.fire({
          html:`<h2>Precio de venta</h2>
          <p>El precio al que deberias vender cada producto seria de $<b>${this.precioProducto}</b> pesos.</p>`,
          confirmButtonText:"Aceptar",
        }).then((result)=>{
          if(result.isConfirmed){
            //? apreto el boton de confirmar en el modal
            this.formGanancia.reset();
  
          }
        })
      }

    }else{
      Swal.fire("Error", "debe ingresar un costo / total / ganancia mayor a 0", "error");
    }

  }

}

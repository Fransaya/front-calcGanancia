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
      console.log("this.", this.precioEnvioProd)
    }else{
      Swal.fire("Error", "debe ingresar un costo / total mayor a 0", "error");
    }
  };

  public calcGanancia(){

  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from "../socket.service";
import {Router} from '@angular/router';
import {ISubscription} from "rxjs/Subscription";
@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit,OnDestroy {
  resultado;
  resumen;
  resultadoS:ISubscription;
  lanzarNuevaP:ISubscription;
  constructor(private socket: SocketService,private ruta:Router) {
    this.resumen ={nombre:name,victorias:0,derrotas:0};
  }
  ngOnInit() {
    this.resultadoS = this.socket.mostrarResultado().subscribe((data)=>{
      this.resumen = data;
      this.mostrarResultado(data)
    });
    this.lanzarNuevaP = this.socket.lanzarNuevaP().subscribe((data)=>{
      this.ruta.navigateByUrl('partida');
    })
  }
  ngOnDestroy(){
    this.resultadoS.unsubscribe();
  }
  public mostrarResultado(datosU){
    if(datosU.resultado == 'victoria'){
      console.log(datosU);
      this.resultado = './assets/victory.jpg';
    }
    else{
      console.log(datosU);
      this.resultado = './assets/defeat.jpg';
    }
  }
  echarOtra(){
    this.socket.echarOtra();
  }
}

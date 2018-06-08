import { Component, OnInit,OnDestroy } from '@angular/core';
import {SocketService} from "../socket.service";
import {Router} from "@angular/router";
import {ISubscription} from "rxjs/Subscription";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit,OnDestroy {
  opciones;
  informacion;
  esperarRival:ISubscription;
  comenzar:ISubscription;
  darTurno:ISubscription;
  ponerEspera:ISubscription;
  terminar:ISubscription;
  constructor(private socket: SocketService,private ruta:Router) {
    this.opciones = [{nombre:'piedra',img:'./assets/piedra.ico'},{nombre:'papel',img:'./assets/paper.png'},{nombre:'tijeras',img:'./assets/tijeras.ico'}];
    this.informacion = '';
  }
  ngOnInit(){
    this.esperarRival = this.socket.esperandoRival().subscribe(()=> {
      this.esperandoRival()
    });
    this.comenzar = this.socket.comenzar().subscribe((data) => {
      console.log(data.turno)
      if(data.turno) this.comenzarTurno();
      else this.esperarTurno();
    });
    this.darTurno = this.socket.recibirTurno().subscribe(()=>{
      this.comenzarTurno()
    });
    this.ponerEspera = this.socket.ponerEspera().subscribe(()=>{
      this.esperarTurno()
    });
    this.terminar = this.socket.terminarP().subscribe(()=>{
      this.terminarP();
    })
  }

  ngOnDestroy(){
    this.esperarRival.unsubscribe();
    this.comenzar.unsubscribe();
    this.darTurno.unsubscribe();
    this.ponerEspera.unsubscribe();
    this.terminar.unsubscribe()
  }

  public esperandoRival(){
    console.log('estoy esperando al rival');
    this.informacion = 'Esperando al rival...'
    $('#modal').show();
    $('.botones').addClass('disabled');
  }
  public comenzarTurno() {
    console.log('he comenzado con mi turno');
    $('#modal').hide();
    $('.botones').removeClass('disabled');
  }
  public esperarTurno(){
    console.log('Estoy esperando mi turno');
    $('.botones').addClass('disabled');
  }
  public realizarJugada(opcion) {
    this.socket.realizarJugada(opcion);
  }
  public terminarP(){
    this.ruta.navigateByUrl('resultado');
  }
}

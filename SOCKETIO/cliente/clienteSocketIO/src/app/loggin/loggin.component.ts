import { Component, OnInit,OnDestroy } from '@angular/core';
import {SocketService} from "../socket.service";
import {Router} from "@angular/router";
import {ISubscription} from "rxjs/Subscription";
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit,OnDestroy {

  constructor(private socket:SocketService,private ruta:Router) { }
  logginUser: string;
  nombreRechazado:ISubscription;
  nombreAceptado:ISubscription;
  ngOnInit() {
    this.nombreRechazado = this.socket.nombreRechazado().subscribe(()=>{
      this.mostrarError();
    });
    this.nombreAceptado = this.socket.nombreAceptado().subscribe(()=>{
      this.jugarPartida();
    });
  }
   ngOnDestroy(){
     this.nombreRechazado.unsubscribe();
     this.nombreAceptado.unsubscribe();
   }
  connectUser(){
    this.socket.connectUser(this.logginUser);
  }
  mostrarError(){
    $('#errorS').replaceWith('Ese nombre está en uso');
  }
  jugarPartida(){
    this.ruta.navigateByUrl('partida');
  }
}

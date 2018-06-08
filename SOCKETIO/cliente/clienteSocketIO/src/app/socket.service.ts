import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  public url = 'http://localhost:3000';
  public mensaje;
  private socket;
  public nombre;

  constructor(public ruta:Router) {
    this.socket = io(this.url)

  }
  public iniciarChat = () =>{
    return Observable.create((observer) =>{
      this.socket.on('iniciarChat', (data) =>{
        observer.next(data)
      })
    })
  };

  public sendMessage(data) {
    console.log('he enviado algo '+data.nombre+data.mensaje);
    this.socket.emit('mensaje', data);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('mensaje', (data) => {
        observer.next(data);
      });
    })
  };

  public connectUser(userInfo){
    this.socket.emit('comprobarUser', userInfo)
  }
  public nombreAceptado = () => {
    return Observable.create((observer) =>{
      this.socket.on('NombreAdmitido',()=>{
        observer.next()
      })
    })
  };
  public nombreRechazado = () => {
    return Observable.create((observer) =>{
      this.socket.on('NombreEnUso',()=>{
        observer.next()
      })
    })
  };
  public esperandoRival = () => {
    return Observable.create((observer) =>{
      this.socket.on('esperandoRival',()=>{
        observer.next()
      })
    })
  };
  public comenzar = () => {
    return Observable.create((observer) =>{
      this.socket.on('iniciarPartida',(data)=>{
        observer.next(data)
      })
    })
  };
  public recibirTurno = () => {
    return Observable.create((observer) => {
      this.socket.on('darTurno', () => {
        observer.next();
      });
    })
  };
  public ponerEspera = () => {
    return Observable.create((observer) => {
      this.socket.on('ponerEspera', () => {
        observer.next();
      });
    })
  };

  public realizarJugada(data) {
    this.socket.emit('realizarJugada', data);
  }
  public terminarP = () =>{
    return Observable.create((observer)=>{
      this.socket.on('terminar',()=>{
        observer.next();
      })
    })
  };

  public mostrarResultado = () => {
    return Observable.create((observer) => {
      this.socket.on('resultado', (data) => {
        observer.next(data)
      })
    })
  };
  public echarOtra(){
    this.socket.emit('echarOtra');
  }
  public lanzarNuevaP = () => {
    return Observable.create((observer) => {
      this.socket.on('lanzarNuevaP',(data)=>{
        observer.next(data)
})
})
  }
}

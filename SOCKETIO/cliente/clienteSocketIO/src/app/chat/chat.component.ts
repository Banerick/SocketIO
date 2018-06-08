import { Component, OnInit } from '@angular/core';
import {SocketService} from "../socket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public conversacion = new Array();
  public mensaje: string;
  public usuario: string;
  constructor(private chat:SocketService) {

  }


  ngOnInit() {
    this.usuario = this.chat.nombre;
    this.chat.iniciarChat().subscribe((data)=>{
      this.usuario = data;
    });
    this.chat.getMessages().subscribe((data) =>{
      let mensajeStr = data.nombre + ' :' + data.mensaje;
      this.conversacion.push(mensajeStr);
    });
  }
  sendMessage(){
    let data = {nombre:this.usuario, mensaje:this.mensaje};
    console.log(data.nombre + data.mensaje);
    this.chat.sendMessage(data);
    this.mensaje ='';
  }
}

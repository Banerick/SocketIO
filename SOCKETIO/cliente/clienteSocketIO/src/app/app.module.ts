import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LogginComponent } from './loggin/loggin.component';
import { SalasComponent } from './salas/salas.component';
import {SocketService} from "./socket.service";
import { RouterModule, Routes,Router } from '@angular/router';
import { PartidaComponent } from './partida/partida.component';
import { ResultadoComponent } from './resultado/resultado.component';

const appRoutes: Routes = [
  { path: '', component: LogginComponent },
  { path: 'partida', component: PartidaComponent },
  {path: 'resultado', component: ResultadoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LogginComponent,
    SalasComponent,
    PartidaComponent,
    ResultadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nombresAct = [''];
var jugador;
var rival;
var par = false;
var resultado = ['Ganas','Pierdes','Empate'];

app.use(express.static('public'));
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('comprobarUser',function(name){
      console.log('comprobarUser');
          if (nombresAct.indexOf(name)!= -1 || 0){
              socket.emit('NombreEnUso')
          }
          else{
              socket.emit('NombreAdmitido');
              guardarUsuario(name)
          }
  });

    function guardarUsuario(name) {
        nombresAct.push(name);
        if (par == false) {
            jugador = socket;
            jugador.jUser = {nombre: name, victorias: 0, derrotas: 0, turno:true, resultado:''};
            par = true;
            jugador.emit('esperandoRival');
            jugador.emit('iniciarChat',jugador.jUser.nombre);

        }
        else if (par == true) {
            rival = socket;
            rival.jUser = {nombre: name, victorias: 0,derrotas: 0, turno:false,resultado:''};
            console.log(rival.jUser.nombre);
            jugador.emit('iniciarPartida', jugador.jUser);
            rival.emit('iniciarPartida', rival.jUser);
            rival.emit('iniciarChat',rival.jUser.nombre);
            par = false;
        }
    }
  socket.on("mensaje",function(a){
    console.log("recibido mensaje: "+a.nombre+a.mensaje);
    io.emit("mensaje",a);
  });
  function comprobarJugadas() {
      if (jugador.eleccion == rival.eleccion) {
          console.log('empate' + jugador.eleccion + rival.eleccion);
          jugador.jUser.turno = true;
          jugador.emit('dar turno');

      }
      else if ((jugador.eleccion == 'piedra' && rival.eleccion == 'papel') ||
          (jugador.eleccion == 'papel' && rival.eleccion == 'tijera') ||
          (jugador.eleccion == 'tijera' && rival.eleccion == 'piedra')) {
          rival.jUser.victorias += 1;
          jugador.jUser.derrotas += 1;
          jugador.jUser.resultado = 'derrota';
          rival.jUser.resultado = 'victoria';
          enviarResultados()
      }
      else {
          jugador.jUser.victorias += 1;
          rival.jUser.derrotas +=1;
          rival.jUser.resultado = 'derrota';
          jugador.jUser.resultado = 'victoria';
          enviarResultados();

      }
  }
  function enviarResultados(){
      jugador.emit('terminar');
      rival.emit('terminar');
      jugador.emit('iniciarChat',jugador.jUser.nombre);
      rival.emit('iniciarChat',rival.jUser.nombre);
      rival.emit('resultado', rival.jUser);
      jugador.emit('resultado',jugador.jUser);
  }
  socket.on('realizarJugada',function(opcion){
        if (jugador.jUser.turno && !rival.jUser.turno){
            jugador.eleccion = opcion;
            jugador.emit('ponerEspera');
            rival.emit('darTurno');
            rival.jUser.turno = true;
            jugador.jUser.turno = false;
        }
        else if(rival.jUser.turno && !jugador.jUser.turno){
            rival.eleccion = opcion;
            rival.emit('ponerEspera');
            rival.jUser.turno = false;
            comprobarJugadas();
        }
    });
  socket.on('echarOtra',function(){
      jugador.emit('lanzarNuevaP');
      rival.emit('lanzarNuevaP');
      jugador.removeAllListeners('esperandoRival');
      var listener = ['iniciarPartida','darTurno','ponerEspera','terminar','resultado','lanzarNuevaP'];
      for (l of listener ){
          console.log(l);
          jugador.removeAllListeners(l);
          rival.removeAllListeners(l);
      }

      jugador.jUser.turno = true;
      console.log('he iniciado'+ jugador.jUser.turno);
      jugador.emit('iniciarPartida', jugador.jUser);
      rival.emit('iniciarPartida', rival.jUser);
    })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
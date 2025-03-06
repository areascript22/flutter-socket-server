const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/Bands');

const bands = new Bands();
bands.addband(new Band('Celtians'));
bands.addband(new Band('Evuveitie'));
bands.addband(new Band('Angeles del infierno'));
bands.addband(new Band('Heroes del silencio'));


//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado: ');
    //Retornar solo al cliente que se acaba de conectar
    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado: ');
     });
    
     client.on('mensaje',(payload)=>{
        console.log('Mensaje !!!', payload.name);
        io.emit('mensaje',{
            admin:'nuevo mensaje',
        });
     });

    //  client.on('emitir-mensaje',(payload)=>{
    //     console.log('MENSAJE DESDE FLUTTER', payload);
    //  //   io.emit('nuevo-mensaje', payload); //Emite a todos
    //  client.broadcast.emit('emitir-mensaje',payload); // Emite a todos menos al que lo emitió 
    //  });

    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });

    client.on('add-band',(payload)=>{
        bands.addband(new Band(payload.name));
        io.emit('active-bands',bands.getBands());
    });

    client.on('remove-band',(payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });
  });

const expres = require('express');
const path = require('path');
require('dotenv').config();

//App de express
const app  = expres();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); 
require('./sockets/socket');



//path publico
const puclicPath  = path.resolve(__dirname, 'public');
app.use(expres.static(puclicPath));



server.listen(process.env.PORT, (err)=>{
    if(err){
        throw new Error(err);
    }
    console.log('Servidor corriendo en el puerto',process.env.PORT);

});
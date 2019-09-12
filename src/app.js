const express = require('express');
const app = express();
const fs = require('fs');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');



//Importa Rotas
const rota = require('./rotas/rotas');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Configuração do mongoose
mongoose.set('useNewUrlParser', true);

mongoose.connect('mongodb://localhost/app-produtos')
  .then(()=> {
    console.log('BD conectado');
  })
  .catch((error)=> {
    console.log('Error ao conectar ao BD');
  });
mongoose.Promise = global.Promise;


//Log
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

//Uso das rotas
app.use('/api', rota);

app.listen(3000, function () {
  console.log('Executando servidor na porta 3000!');
});



var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var UsuariosSchema = new mongoose.Schema({
    usuario: String,
    email: String,
    senha: String
}, {
    versionKey:false
}
);

module.exports = mongoose.model("usuarios", UsuariosSchema);
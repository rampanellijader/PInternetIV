var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var ProdutosSchema = new mongoose.Schema({
    nome: String,
    preco: Number
}, {
    versionKey:false
}
);

module.exports = mongoose.model("produtos", ProdutosSchema);
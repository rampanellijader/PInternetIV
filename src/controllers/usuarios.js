const Usuario = require('../models/usuarios')


exports.inserir = (req, res, next) => {
    let novoUsuario = new Usuario(req.body);        
    novoUsuario.save((err, usuario) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(usuario);
        
    });
};
exports.atualizar = (req, res, next) => {
    let id = req.params.id;
    let usuarioAtualizar = req.body;
    Usuario.findOneAndUpdate({ _id: id }, usuarioAtualizar, { new: true }, (err, usuarioAtual) => {
        if(err){
            res.send(err);
        }
        res.json(usuarioAtual);
    });
};
exports.deletar = (req, res, next) => {
    let id = req.params.id;
    Usuario.findOneAndDelete({ _id: id }, (err, usuarioAtual) => {
        if(err){
            res.send(err);
        }
        res.json(usuarioAtual);
    });
};

exports.buscarPorId = (req, res, next) => {
    let id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        if(err)
            res.status(500).send(err);        
        res.json(usuario);
    });
};

exports.procurar = (req, res, next) => {
    if (req.query && req.query.nome){
        const paramNome = req.query.nome;
        Usuario.find({nome: paramNome}, (err, usuarios) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(usuarios);
        });
    }
}

exports.listar = (req, res, next) => {
    Usuario.find({},(err, usuarios) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(usuarios);
    });
    
};
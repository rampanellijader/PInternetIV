const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');
var jwt = require('jsonwebtoken');


exports.inserir = (req, res, next) => {
    let senha = bcrypt.hashSync(req.body.senha,10);
    let novoUsuario = new Usuario({
        ususario: req.body.usuario,
        email: req.body.email,
        senha: senha 
    });  
    
    
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
    Usuario.findById(id, (err, Usuario) => {
        if(err)
            res.status(500).send(err);        
        res.json(Usuario);
    });
};

exports.buscarPorUsuario = (req, res, next) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    console.log(usuario);
        Usuario.findOne({usuario: usuario}, (err, usuario) => {
            if(err){
                res.status(500).send(err);
            }

        const valid = bcrypt.compareSync(senha, usuario.senha);
            if(valid){
                const token = jwt.sign({
                    id: usuario.id
                }, '$en@c', {expiresIn:'1h'});
             res.status(201).send({"token": token});

            }
            else res.error(500).send("Usuário ou senha inválidos");
        });
    }




exports.validaToken = (req, res, next) =>{
    const token = req.get("x-auth-token");
    if(!token)
        res.status(403).send("Não tem token de acesso!");
     else{
         jwt.verify(token, "$en@c",(err, usuarioId) =>{
             if(err){
                 res.status(401).send(err);
             }
             else {
                 console.log("Autorizado: "+usuarioId);
                 next();
         }
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
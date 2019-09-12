const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos');
const usuariosController = require('../controllers/usuarios');

//rotas produtos
router.get('/produtos', produtosController.listar);
router.post('/produtos', produtosController.inserir);
router.get('/produtos/search', produtosController.procurar);
router.get('/produtos/:id', produtosController.buscarPorId);
router.put('/produtos/:id', produtosController.atualizar);
router.delete('/produtos/:id', produtosController.deletar);


//Rotas do usuários
router.get('/usuarios', usuariosController.listar);
router.post('/usuarios', usuariosController.inserir);
router.get('/usuarios/search', usuariosController.procurar);
router.get('/usuarios/:id', usuariosController.buscarPorId);
router.put('/usuarios/:id', usuariosController.atualizar);
router.delete('/usuarios/:id', usuariosController.deletar);

module.exports = router;

var express = require("express")
var produtoControlador = require("../controllers/controladorProduto")

var rotas = express.Router()

//rotas da API
rotas.post("/produtos", produtoControlador.inserir)
rotas.get("/produtos", produtoControlador.buscar)
rotas.get("/produtos/:id", produtoControlador.buscarUm)
rotas.put("/produtos/:id", produtoControlador.atualizar)
rotas.delete("/produtos/:id", produtoControlador.remover)

//rotas de páginas
rotas.get("/cadastrarProduto", produtoControlador.novoFormProduto) //retorna a página de cadastro
rotas.get("/editarProduto/:id", produtoControlador.editarFormProduto) //retorna a pagina de edição
rotas.post("/ediReqProduto/:id", produtoControlador.montarReqEdicaoProduto) //monta requisição de edição
rotas.get("/removerProduto/:id", produtoControlador.montarReqDeleteProduto) //monta requisição de remoção

module.exports = rotas
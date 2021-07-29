var express = require("express")
var produtoControlador = require("../controllers/controladorProduto")

var rotasProdutos = express.Router()

//rotasProdutos da API
rotasProdutos.post("/produtos", produtoControlador.inserir)
rotasProdutos.get("/produtos", produtoControlador.buscar)
rotasProdutos.get("/produtos/:id", produtoControlador.buscarUm)
rotasProdutos.put("/produtos/:id", produtoControlador.atualizar)
rotasProdutos.delete("/produtos/:id", produtoControlador.remover)

//rotasProdutos de páginas
rotasProdutos.get("/cadastrarProduto", produtoControlador.novoFormProduto) //retorna a página de cadastro
rotasProdutos.get("/editarProduto/:id", produtoControlador.editarFormProduto) //retorna a pagina de edição
rotasProdutos.post("/ediReqProduto/:id", produtoControlador.montarReqEdicaoProduto) //monta requisição de edição
rotasProdutos.get("/removerProduto/:id", produtoControlador.montarReqDeleteProduto) //monta requisição de remoção

module.exports = rotasProdutos
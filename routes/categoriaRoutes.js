var express = require("express")
var categoriaControlador = require("../controllers/controladorCategoria")

var rotasCategorias = express.Router()

//rotasCategorias da API
rotasCategorias.post("/categorias", categoriaControlador.inserir)
rotasCategorias.get("/categorias", categoriaControlador.buscar)
rotasCategorias.get("/categorias/:id", categoriaControlador.buscarUm)
rotasCategorias.put("/categorias/:id", categoriaControlador.atualizar)
rotasCategorias.delete("/categorias/:id", categoriaControlador.remover)

/* //rotasCategorias de páginas
rotasCategorias.get("/cadastrarCategoria", categoriaControlador.novoFormCategoria) //retorna a página de cadastro
rotasCategorias.get("/editarCategoria/:id", categoriaControlador.editarFormCategoria) //retorna a pagina de edição
rotasCategorias.post("/ediReqCategoria/:id", categoriaControlador.montarReqEdicaoCategoria) //monta requisição de edição
rotasCategorias.get("/removerCategoria/:id", categoriaControlador.montarReqDeleteCategoria) //monta requisição de remoção */

module.exports = rotasCategorias
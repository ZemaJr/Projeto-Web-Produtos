var express = require("express")
var carroControlador = require("./../controllers/controladorCarro")

var rotas = express.Router()

//rotas da API
rotas.post("/carros", carroControlador.inserir)
rotas.get("/carros", carroControlador.buscar)
rotas.get("/carros/:id", carroControlador.buscarUm)
rotas.put("/carros/:id", carroControlador.atualizar)
rotas.delete("/carros/:id", carroControlador.remover)

//rotas de páginas
rotas.get("/cadastrar", carroControlador.novoFormulario) //retorna a página de cadastro
rotas.get("/editar/:id", carroControlador.editarFormulario) //retorna a pagina de edição
rotas.post("/ediReq/:id", carroControlador.montarReqEdicao) //monta requisição de edição
rotas.get("/remover/:id", carroControlador.montarReqDelete) //monta requisição de remoção

module.exports = rotas
var categoria = require("../models/categoria")
var axios = require("axios")
var qs = require("querystring")

var controladorCategoria = {}

//Create - POST
controladorCategoria.inserir = function(req, res) {
    categoria.create({
        idCategoria: req.body.idCategoria,
        descricaoCategoria: req.body.descricaoCategoria
    }).then(
        function(dados) {
            res.status(200).redirect("/categorias")
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao inserir o categoria: " + erro)
        }
    )
}

//Read - GET
controladorCategoria.buscar = function(req, res) {
    categoria.findAll({
        raw: true
    }).then(
        function(dados) {
            //res.status(200).send(dados)
            res.render("tabelacategoria", {
                categoria: dados,
                pessoa: "José de Castro Jr."
            })
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao buscar por categorias: " + erro)
        }
    )
}

//Read - GET 2
controladorCategoria.buscarUm = function(req, res) {
    categoria.findAll({
        raw: true,
        where: {
            idCategoria: req.params.idCategoria
        }
    }).then(
        function(dados) {
            res.status(200).send(dados)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao buscar por categoria: " + erro)
        }
    )
}

//Update - PUT
controladorCategoria.atualizar = function(req, res) {
    categoria.update({
        idCategoria: req.body.idCategoria,
        descricaoCategoria: req.body.descricaoCategoria
    }, {
        where: {
            idCategoria: req.params.idCategoria
        }
    }).then(
        function(dados) {
            res.sendStatus(200)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao atualizar um categoria: " + erro)
        }
    )
}

//Delete - DELETE
controladorCategoria.remover = function(req, res) {
    categoria.destroy({
        where: {
            idCategoria: req.params.idCategoria
        }
    }).then(
        function(dados) {
            res.sendStatus(200)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao remover um categoria: " + erro)
        }
    )
}

//solicitarNovoFormulario
controladorCategoria.novoFormCategoria = function(req, res) {
    res.render("novoFormCategoria")
}

//solicitarEditarFormulario
controladorCategoria.editarFormCategoria = function(req, res) {
    res.render("editarFormCategoria", {
        idCategoria: req.params.id
    })
}

//montarRequisiçãoEditar
controladorCategoria.montarReqEdicaocategoria = function(req, res) {
    axios.put("/categorias/" + req.params.idCategoria,
            qs.stringify({
                descricaoCategoria: req.body.descricaoCategoria,
                precocategoria: req.body.precocategoria,
                idCategoria: req.body.idCategoria,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                proxy: {
                    /* host: "3.131.97.189",
                    port: 3000 */
                    host: "localhost",
                    port: 8081
                }
            }
        ).then(function() {
            res.status(200).redirect("/categorias")
        })
        .catch(function(err) {
            res.status(500).send("Erro ao editar o categoria: " + err);
        })
}

//montarRequisiçãoRemover
controladorCategoria.montarReqDeletecategoria = function(req, res) {
    axios.delete('/categorias/' + req.params.idCategoria, {
            proxy: {
                /*host: "3.131.97.189",
                port: 3000 */
                host: "localhost",
                port: 8081
            }
        }).then(function() {
            res.status(200).redirect("/categorias")
        })
        .catch(function(err) {
            res.status(500).send("Erro ao apagar um categoria: " + err);
        })
}

module.exports = controladorCategoria
var produto = require("../models/produto")
var axios = require("axios")
var qs = require("querystring")

var controlador = {}

//Create - POST
controlador.inserir = function(req, res) {
    produto.create({
        descricaoProduto: req.body.descricaoProduto,
        precoProduto: req.body.precoProduto,
        idCategoria: req.body.idCategoria
    }).then(
        function(dados) {
            res.status(200).redirect("/produtos")
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao inserir o produto: " + erro)
        }
    )
}

//Read - GET
controlador.buscar = function(req, res) {
    produto.findAll({
        raw: true
    }).then(
        function(dados) {
            //res.status(200).send(dados)
            res.render("tabelaProduto", {
                produto: dados,
                pessoa: "José Jr."
            })
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao buscar por produtos: " + erro)
        }
    )
}

//Read - GET 2
controlador.buscarUm = function(req, res) {
    produto.findAll({
        raw: true,
        where: {
            idproduto: req.params.idProduto
        }
    }).then(
        function(dados) {
            res.status(200).send(dados)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao buscar por produto: " + erro)
        }
    )
}

//Update - PUT
controlador.atualizar = function(req, res) {
    produto.update({
        descricaoProduto: req.body.descricaoProduto,
        precoProduto: req.body.precoProduto,
        idCategoria: req.body.idCategoria,
    }, {
        where: {
            idproduto: req.params.idProduto
        }
    }).then(
        function(dados) {
            res.sendStatus(200)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao atualizar um produto: " + erro)
        }
    )
}

//Delete - DELETE
controlador.remover = function(req, res) {
    produto.destroy({
        where: {
            idproduto: req.params.idProduto
        }
    }).then(
        function(dados) {
            res.sendStatus(200)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao remover um produto: " + erro)
        }
    )
}

//solicitarNovoFormulario
controlador.novoFormProduto = function(req, res) {
    res.render("novoFormProduto")
}

//solicitarEditarFormulario
controlador.editarFormProduto = function(req, res) {
    res.render("editarFormProduto", {
        idproduto: req.params.id
    })
}

//montarRequisiçãoEditar
controlador.montarReqEdicaoProduto = function(req, res) {
    axios.put("/produtos/" + req.params.idProduto,
            qs.stringify({
                descricaoProduto: req.body.descricaoProduto,
                precoProduto: req.body.precoProduto,
                idCategoria: req.body.idCategoria,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                proxy: {
                    port: 8081
                }
            }
        ).then(function() {
            res.status(200).redirect("/produtos")
        })
        .catch(function(err) {
            res.status(500).send("Erro ao editar o produto: " + err);
        })
}

//montarRequisiçãoRemover
controlador.montarReqDeleteProduto = function(req, res) {
    axios.delete('/produtos/' + req.params.idProduto, {
            proxy: {
                port: 8081
            }
        }).then(function() {
            res.status(200).redirect("/produtos")
        })
        .catch(function(err) {
            res.status(500).send("Erro ao apagar um produto: " + err);
        })
}

module.exports = controlador
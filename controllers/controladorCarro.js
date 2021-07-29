var carro = require("./../models/carro")
var axios = require("axios")
var qs = require("querystring")

var controlador = {}

//Create - POST
controlador.inserir = function(req, res) {
    carro.create({
        marca: req.body.marca,
        ano: req.body.ano,
        usado: req.body.usado
    }).then(
        function(dados) {
            res.status(200).redirect("/carros")
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao inserir o carro: " + erro)
        }
    )
}

//Read - GET
controlador.buscar = function(req, res) {
    carro.findAll({
        raw: true
    }).then(
        function(dados) {
            //res.status(200).send(dados)
            res.render("tabela", {
                carro: dados,
                pessoa: "Vinícius"
            })
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao buscar por carros: " + erro)
        }
    )
}

//Read - GET 2
controlador.buscarUm = function(req, res) {
    carro.findAll({
        raw: true,
        where: {
            idcarro: req.params.id
        }
    }).then(
        function(dados) {
            res.status(200).send(dados)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao buscar por carro: " + erro)
        }
    )
}

//Update - PUT
controlador.atualizar = function(req, res) {
    carro.update({
        marca: req.body.marca,
        ano: req.body.ano,
        usado: req.body.usado,
    }, {
        where: {
            idcarro: req.params.id
        }
    }).then(
        function(dados) {
            res.sendStatus(200)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao atualizar um carro: " + erro)
        }
    )
}

//Delete - DELETE
controlador.remover = function(req, res) {
    carro.destroy({
        where: {
            idcarro: req.params.id
        }
    }).then(
        function(dados) {
            res.sendStatus(200)
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao remover um carro: " + erro)
        }
    )
}

//solicitarNovoFormulario
controlador.novoFormulario = function(req, res) {
    res.render("novoForm")
}

//solicitarEditarFormulario
controlador.editarFormulario = function(req, res) {
    res.render("editarForm", {
        idcarro: req.params.id
    })
}

//montarRequisiçãoEditar
controlador.montarReqEdicao = function(req, res) {
    axios.put("/carros/" + req.params.id,
            qs.stringify({
                marca: req.body.marca,
                ano: req.body.ano,
                usado: req.body.usado,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                proxy: {
                    port: 8082
                }
            }
        ).then(function() {
            res.status(200).redirect("/carros")
        })
        .catch(function(err) {
            res.status(500).send("Erro ao editar o carro: " + err);
        })
}

//montarRequisiçãoRemover
controlador.montarReqDelete = function(req, res) {
    axios.delete('/carros/' + req.params.id, {
            proxy: {
                port: 8082
            }
        }).then(function() {
            res.status(200).redirect("/carros")
        })
        .catch(function(err) {
            res.status(500).send("Erro ao apagar um carro: " + err);
        })
}

module.exports = controlador
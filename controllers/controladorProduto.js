var produto = require("../models/produto")
var axios = require("axios")
var qs = require("querystring")

var controladorProduto = {}

//Create - POST
controladorProduto.inserir = function(req, res) {
    produto.create({
        descricaoProduto: req.body.descricao,
        precoProduto: req.body.preco,
        idCategoria: req.body.idCateg
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
controladorProduto.buscar = function(req, res) {

    produto.findAll({
        raw: true
    }).then(
        function(dados) {
            //res.status(200).send(dados)

            //dados[0].idCategoria = "Não definida"
            //console.log(dados)
            res.render("tabelaProduto", {
                produto: dados,
                pessoa: "José de Castro Jr."
            })
        }
    ).catch(
        function(erro) {
            res.status(500).send("Erro ao buscar por produtos: " + erro)
        }
    )
}

//Read - GET 2
controladorProduto.buscarUm = function(req, res) {
    produto.findAll({
        raw: true,
        where: {
            idProduto: req.params.id
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
controladorProduto.atualizar = function(req, res) {
    console.log("chegou!" + req.params.id)
    produto.update({
        descricaoProduto: req.body.descricao,
        precoProduto: req.body.preco,
        idCategoria: req.body.idCateg
    }, {
        where: {
            idProduto: req.params.id
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
controladorProduto.remover = function(req, res) {
    produto.destroy({
        where: {
            idProduto: req.params.id
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
controladorProduto.novoFormProduto = function(req, res) {
    res.render("novoFormProduto")
}

//solicitarEditarFormulario
controladorProduto.editarFormProduto = function(req, res) {
    res.render("editarFormProduto", {
        idProduto: req.params.id
    })
}

//montarRequisiçãoEditar
controladorProduto.montarReqEdicaoProduto = function(req, res) {
    axios.put("/produtos/" + req.params.id,
            qs.stringify({
                descricaoProduto: req.body.descricao,
                precoProduto: req.body.preco,
                idCategoria: req.body.idCateg
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                proxy: {
                    /* host: "3.131.97.189",
                    port: 3000 */
                    // host: "localhost",
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
controladorProduto.montarReqDeleteProduto = function(req, res) {
    axios.delete('/produtos/' + req.params.id, {
            proxy: {
                /*host: "3.131.97.189",
                port: 3000 */
                // host: "localhost",
                port: 8081
            }
        }).then(function() {
            res.status(200).redirect("/produtos")
        })
        .catch(function(err) {
            res.status(500).send("Erro ao apagar um produto: " + err);
        })
}

module.exports = controladorProduto
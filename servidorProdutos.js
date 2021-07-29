var express = require("express")
var handlebars = require("express-handlebars")
var rotasProdutos = require("./routes/produtoRoutes")
var rotasCategorias = require("./routes/categoriaRoutes")

var servidor = express()
const PORTA = 8081
    /*const PORTA = 3000*/

//configuração do handlebars no projeto
servidor.engine("handlebars", handlebars({ defaultLayout: "mainProduto" }))
servidor.set("view engine", "handlebars")

servidor.use(express.urlencoded({ extended: true }))
servidor.use(rotasProdutos)
servidor.use(rotasCategorias)

servidor.listen(PORTA, function() {
    console.log("Executando servidor...")
})
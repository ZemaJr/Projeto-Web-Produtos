var express = require("express")
var handlebars = require("express-handlebars")
var rotas = require("./routes/produtoRoutes")

var servidor = express()
const PORTA = 8082

//configuração do handlebars no projeto
servidor.engine("handlebars", handlebars({ defaultLayout: "mainProduto" }))
servidor.set("view engine", "handlebars")

servidor.use(express.urlencoded({ extended: true }))
servidor.use(rotas)

servidor.listen(PORTA, function() {
    console.log("Executando servidor...")
})
var sequelize = require("sequelize")
    /*
    var conexao = new sequelize("ProgWeb", "appWeb", "12345678", {
        host: "ifsc.ct7axhnpxafd.us-east-2.rds.amazonaws.com",
        dialect: "mysql"
    })
    */

var conexao = new sequelize("ifsc", "root", "", {
    host: "localhost",
    dialect: "mysql"
})


conexao.authenticate().then(
    function() {
        console.log("Conectado ao banco com sucesso!")
    }
).catch(
    function(erro) {
        console.log("Erro ao conectar: " + erro)
    }
)

module.exports = conexao
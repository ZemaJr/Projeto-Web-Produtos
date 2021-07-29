var sequelize = require("sequelize")
var banco = require("../configs/bancoConfig")

var produto = banco.define("produto", {
    idProduto: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    descricaoProduto: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    precoProduto: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    idCategoria: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

//produto.sync()

module.exports = produto
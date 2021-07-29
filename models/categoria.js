var sequelize = require("sequelize")
var banco = require("../configs/bancoConfig")

var categoria = banco.define("categoria", {
    idCategoria: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    descricaoCategoria: {
        type: sequelize.STRING(50),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

categoria.sync()

module.exports = categoria
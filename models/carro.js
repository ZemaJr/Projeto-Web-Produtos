var sequelize = require("sequelize")
var banco = require("./../configs/bancoConfig")

var carro = banco.define("carro", {
    idcarro: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    marca: {
        type: sequelize.STRING(20),
        allowNull: false,
    },
    ano: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    usado: {
        type: sequelize.BOOLEAN,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

carro.sync()

module.exports = carro
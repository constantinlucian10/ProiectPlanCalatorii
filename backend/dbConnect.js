var Sequelize = require("sequelize")
exports.connect = function() {
    return new Sequelize('planCalatorii', 'root', '', {
        dialect:'mysql',
        host:'localhost'
    },{
        freezeTableName: true
    })
}


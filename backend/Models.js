var Sequelize = require("sequelize")
var sequelize = require("./dbConnect.js").connect()

//model-ul pentru utilizatori
const Utilizator = sequelize.define('utilizatori', {
  nume: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  parola: {
    type: Sequelize.STRING
  }},{
  freezeTableName: true
});

//model-ul pentru calatorii
const Calatorii = sequelize.define('calatorii', {
  tara: {
    type: Sequelize.STRING
  },
  orase: {
    type: Sequelize.STRING
  },
  an: {
    type: Sequelize.STRING
  },
  review: {
    type: Sequelize.TEXT
  },
  durata: {
    type: Sequelize.INTEGER
  },
  id_utilizator: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
});

Utilizator.hasMany(Calatorii, {foreignKey: 'id_utilizator', sourceKey: 'id'});
Calatorii.belongsTo(Utilizator, {foreignKey: 'id_utilizator', targetKey: 'id'});

exports.getUtilizatorModel = function() {
    return Utilizator;
}
exports.getCalatoriiModel = function() {
    return Calatorii;
}
//     sequelize.sync({
//     force: true
// });
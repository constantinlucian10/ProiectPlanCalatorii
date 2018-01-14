var bcrypt = require("bcrypt")//pentru generare parole
var Sequelize = require("sequelize")
var sequelize = require("./dbConnect.js").connect()
var validator = require('validator')//validare date venite
var jwt = require('jsonwebtoken')//pentru autentificarea prin java web tokens
var Utilizator = require("./Models.js").getUtilizatorModel()




exports.inregistrare = function(req,res) {
//     sequelize.sync({
//     force: true
// });
    if (!validator.isEmpty(req.body.nume+'') && 
    !validator.isEmpty(req.body.email+'') && 
    validator.isEmail(req.body.email+'') && 
    !validator.isEmpty(req.body.parola+'')) {
       Utilizator.create({
            nume:req.body.nume,
            email:req.body.email,
            parola:bcrypt.hashSync(req.body.parola, 10)
        }).then(utilizator => {
             res.json({mesaj:'Cont creat cu succes'})
        })
    } else {
        res.json({eroare:true,mesaj:'A avut loc o eroare de validare'});
    }



}
exports.login = function(req,res) {
    if (!validator.isEmpty(req.body.email+'') && validator.isEmail(req.body.email+'') && !validator.isEmpty(req.body.parola+'')) {
     Utilizator.findOne({ where: {email: req.body.email} }).then(utilizator => {
         if (utilizator == null) {
            res.json({eroare:true,mesaj:'Contul nu exista'});
         }
         bcrypt.compare(req.body.parola,utilizator.parola, function(err, rez) {
             if (rez) {
               res.json({mesaj:'Logat cu succes',token: jwt.sign({ id: utilizator.id}, 'jwt-plan-calatorii-secret')});
             } else {
                 res.json({eroare:true,mesaj:'Parola sau Email-ul este gresit'});
             }
             if(err) {
                res.json({eroare:true,mesaj:'A avut loc o eroare'}); 
             }
         });
    })
    } else {
        res.json({eroare:true,mesaj:'A avut loc o eroare de validare'});
    }
}
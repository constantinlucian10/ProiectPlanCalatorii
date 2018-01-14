var Sequelize = require("sequelize")
var sequelize = require("./dbConnect.js").connect()
var validator = require('validator')//validare date venite
var jwt = require('jsonwebtoken')//pentru autentificarea prin java web tokens
var Calatorii = require("./Models.js").getCalatoriiModel()
var Utilizator = require("./Models.js").getUtilizatorModel()


exports.adauga = function(req,res) {

    let id_utilizator = null;
    try {
         id_utilizator= jwt.verify(req.body.authToken, 'jwt-plan-calatorii-secret').id;
    } catch(err) {
       res.json({eroare:true,mesaj:'Nu esti autentificat'});
    }


    if (!validator.isEmpty(req.body.tara+'') && 
    !validator.isEmpty(req.body.orase+'') && 
    validator.isInt(req.body.durata+'') && 
    validator.isInt(id_utilizator+'')) {
       Calatorii.create({
            tara:req.body.tara,
            orase:req.body.orase,
            an:req.body.an,
            durata:req.body.durata,
            review:req.body.review,
            id_utilizator:id_utilizator
        }).then(calatorie => {
             res.json({mesaj:'Calatoria a fost creata cu succes'})
        })
    } else {
        res.json({eroare:true,mesaj:'A avut loc o eroare de validare'});
    }



}
exports.calatorii = function(req,res) {
    let id_utilizator = null;
    try {
         id_utilizator= jwt.verify(req.body.authToken, 'jwt-plan-calatorii-secret').id;
    } catch(err) {
       res.json({eroare:true,mesaj:'Nu esti autentificat'});
    }
    Calatorii.findAll({
        include: [{
            model:Utilizator,
            // as: 'utilizator',
            attributes: ['nume']
            
        }]
        
    }).then(function(resp) {
        let rezultat = {
            proprii:[],
            utilizatorii:[]
        };
        resp.forEach(function(calatorie) {
            if (calatorie.id_utilizator == id_utilizator ) {
                rezultat.proprii.push(calatorie)
            } else {
                rezultat.utilizatorii.push(calatorie)
            }
        });
        res.json({rezultat});
    })
}
exports.modifica = function(req,res) {

    let id_utilizator = null;
    try {
         id_utilizator= jwt.verify(req.body.authToken, 'jwt-plan-calatorii-secret').id;
    } catch(err) {
       res.json({eroare:true,mesaj:'Nu esti autentificat'});
    }


    if (!validator.isEmpty(req.body.tara+'') && 
    !validator.isEmpty(req.body.orase+'') && 
    validator.isInt(req.body.durata+'') && 
    validator.isInt(id_utilizator+'')) {
       Calatorii.update({
            tara:req.body.tara,
            orase:req.body.orase,
            an:req.body.an,
            durata:req.body.durata,
            review:req.body.review,
            id_utilizator:id_utilizator
        },{ where: {id: req.params.id,id_utilizator } }).then(calatorie => {
             res.json({mesaj:'Calatoria a fost modificata cu succes'})
        })
    } else {
        res.json({eroare:true,mesaj:'A avut loc o eroare de validare'});
    }



}
exports.sterge = function(req,res) {
    let id_utilizator = null;
    try {
         id_utilizator= jwt.verify(req.query.authToken, 'jwt-plan-calatorii-secret').id;
    } catch(err) {
       res.json({eroare:true,mesaj:'Nu esti autentificat'});
    }
   Calatorii.findById(req.params.id).then(function(calatorie){
    if(calatorie){
        calatorie.destroy().then(function(){
            res.json({sters:true,mesaj:'Calatoria a fost stearsa'})
        })
    } else{
       res.json({eroare:true,mesaj:'Nu s-a gasit calatoria '});
    }
   
   })
}
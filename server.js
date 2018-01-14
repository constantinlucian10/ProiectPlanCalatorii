var express = require("express")
var Sequelize = require("sequelize")
var sequelize = require("./backend/dbConnect.js").connect()
var userController = require("./backend/AuthController.js")
var calatoriiController = require("./backend/CalatoriiController.js")
var cors = require('cors')


var app = express()


app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(cors())

app.use(express.json());       
app.use(express.urlencoded()); 

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

app.post('/inregistrare', userController.inregistrare)
app.post('/login', userController.login)
app.post('/plan-calatorie/adauga', calatoriiController.adauga)
app.post('/plan-calatorie', calatoriiController.calatorii)
app.put('/plan-calatorie/:id/modifica', calatoriiController.modifica)
app.delete('/plan-calatorie/:id/sterge', calatoriiController.sterge)
app.listen(8081)



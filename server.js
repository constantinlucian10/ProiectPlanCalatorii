var express = require("express")
var Sequelize = require("sequelize")


//connect to mysql database
var sequelize = new Sequelize('plan', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var Calatorie = sequelize.define('calatorie', {
    denumire: Sequelize.STRING,
    itinerariu_id: Sequelize.INTEGER,
    price: Sequelize.INTEGER
})

var Itinerariu = sequelize.define('itinerariu', {
    tara: Sequelize.STRING,
    orase: Sequelize.STRING,
    traseu: Sequelize.TEXT,
    image: Sequelize.STRING
})


var app = express()

//access static files
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));


// get a list of categories
app.get('/calatorie', function(request, response) {
    Calatorie.findAll().then(function(calatorie){
        response.status(200).send(calatorie)
    })
        
})

// get one category by id
app.get('/calatorie/:id', function(request, response) {
    Calatorie.findOne({where: {id:request.params.id}}).then(function(calatorie) {
        if(calatorie) {
            response.status(200).send(calatorie)
        } else {
            response.status(404).send()
        }
    })
})

//create a new category
app.post('/calatorie', function(request, response) {
    Calatorie.create(request.body).then(function(calatorie) {
        response.status(201).send(calatorie)
    })
})

app.put('/calatorie/:id', function(request, response) {
   Calatorie.findById(request.params.id).then(function(calatorie) {
        if(calatorie) {
            calatorie.update(request.body).then(function(calatorie){
                response.status(201).send(calatorie)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/calatorie/:id', function(request, response) {
    Calatorie.findById(request.params.id).then(function(calatorie) {
        if(calatorie) {
            calatorie.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/itinerariu', function(request, response) {
    Itinerariu.findAll().then(
            function(itinerariu) {
                response.status(200).send(itinerariu)
            }
        )
})

app.get('/itinerariu/:id', function(request, response) {
    Itinerariu.findAll().then(
            function(itinerariu) {
                response.status(200).send(itinerariu)
            }
        )
})

app.post('/itinerariu', function(request, response) {
    Itinerariu.create(request.body).then(function(itinerariu) {
        response.status(201).send(itinerariu)
    })
})


app.put('/itinerariu/:id', function(request, response) {
    Itinerariu.findById(request.params.id).then(function(itinerariu){
        if(itinerariu){
            itinerariu.update(request.body).then(function(itinerariu){
                response.status(201).send(itinerariu)
            }).catch(function(error){
                response.status(200).send(error)
            })
        } else {
            response.status(404).send("Not found")
        }
    })
})

app.delete('/itinerariu/:id', function(request, response) {
   Itinerariu.findById(request.params.id).then(function(itinerariu){
    if(itinerariu){
        itinerariu.destroy().then(function(){
            response.status(204).send()
        })
    } else{
        response.status(404).send('Not found')
    }
   
   })
})


app.get('/calatorie/:id/itinerariu', function(request, response) {
    Calatorie.findAll({where:{itinerariu_id: request.params.id}}).then(
            function(itinerariu) {
                response.status(200).send(itinerariu)
            }
        )
})

app.listen(8080)
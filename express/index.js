// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./src/router');
const mongoose = require('mongoose');

// mongodb://<dbuser>:<dbpassword>@ds141937.mlab.com:41937/todos
//mongodb koneksi
mongoose.connect('mongodb://mbayusaputro:saputro24@ds141937.mlab.com:41937/todos', {useNewUrlParser:true});
mongoose.Promise = global.Promise;

//Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//error middleware
app.use(function(err, req, res, next){
	res.status(422).send({err: err.message});
});

//Router
app.use('/api',router);

// app.get('/', function(req, res){
// 	console.log('this is a homepage');
// 	res.send('Likey likey likey');
// });

// set CORS to allow access from any server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
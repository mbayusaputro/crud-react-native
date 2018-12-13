const express = require('express');
const router = express.Router();
const Todo = require('./model');

router.get('/', function(req, res){
  Todo.find({}).then(function(result){
  	res.send(result);
  });
});

// router.get('/', function(req, res){
//   Todo.find({_id: req.params.id}).then(function(todo){
//   	res.send(todo);
//   });
// });

router.post('/', function(req, res, next){
  const {name} = req.body;

	//save to mongodb
  Todo.create(req.body)
	.then(function(result){
	  res.send(result);
	})
	.catch(next);

	// console.log(req.body);

 //    res.send({
 //    	method: 'POST',
 //    	nama: nama
 //    });
});

router.put('/:id', function(req, res){
  Todo.findOneAndUpdate({_id: req.params.id}, req.body).then(function(result){
  	Todo.findOne({_id: req.params.id}).then(function(update){
  		res.send(update);
		});
	});
});

router.delete('/:id', function(req, res, next){
  Todo.findOneAndRemove({_id: req.params.id}).then(function(result){
  	res.send(result);
	})
	.catch(next);
});

module.exports = router;
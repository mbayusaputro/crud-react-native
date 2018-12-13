const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	name: {
		type: String,
		required: true		
	}
});

const Todo = mongoose.model('model', TodoSchema);

module.exports = Todo;
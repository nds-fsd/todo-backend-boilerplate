const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	description: { type: String, required: true},
  done: {type: Boolean, required: true},
  colection: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Colection'}
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});


const Task = mongoose.model('Task', schema);

module.exports = Task;

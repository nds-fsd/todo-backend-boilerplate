const mongoose = require('mongoose');


const schema = new mongoose.Schema({
	name: { type: String, required: true},
  icon: {type: String, required: true},
  color:{type: String, required: true},
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});


const Colection = mongoose.model('Colection', schema);



module.exports = Colection;

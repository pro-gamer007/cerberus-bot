const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	name: String,
	response: String,
});

module.exports = mongoose.model('Tag', Schema);
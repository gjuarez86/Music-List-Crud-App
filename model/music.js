//Create a Schema it's similar to a contructors

var mongoose = require('mongoose');
var musicSchema = mongoose.Schema({
	Name: String, 
	Artist: String,
	Genre: String,
	Rating: Number 
});
var Music = mongoose.model("Music", musicSchema);

module.exports = Music;


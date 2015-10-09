var express = require('express');
var app 	= express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var Music = require('./model/music');//better practice capitalize the m
mongoose.connect("mongodb://localhost/musicdb");//this will connect to mongoose 
// var mongoURI = "mongodb://localhost:27017/test";
// var MongoDB = mongoose.connect(mongoURI).connection;
// MongoDB.on('error', function(err) { console.log(err.message); });
// MongoDB.once('open', function() {
//   console.log("mongodb connection open");
// });

//middleware
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// set view engine.. set is to setting it to view ejs files
app.set('view engine', 'ejs');

//make Create page, use .get to create a page
app.get('/song', function(req, res) {
	res.render('pages/song');// before error get because it wasn't looking in the right place pages/..it;s already looking at views
});

//posting is creating new data, and .get is read..AKS ALLEN IS /CREATE A ROUTE? Just creating data.
app.post('/create', function(req, res) {
	var music = new Music(req.body);// req.body getting info from body in song.ejs file
	music.save(function(){});//save the infor moggose command
	res.redirect('/');//redirect to /
})

app.get('/', function(req, res) {//this is finding the info in the database. 
	Music.find(function(err, music) {
		res.render("pages/index", {music: music});// so this is going to call it on the ejs file
	});//this find is on mongoose
});

app.get('/music/:id', function(req, res) { //this is based on clicking the edit hyperlink// /music/:id because that's what we wrong in index.ejs file. Id has it's own id for each object.
	Music.findOne({_id:req.params.id}, function(err, songs){
		res.render('pages/edit', {songs:songs});//this render is where we are going when we click the edit hypelink.
	});//when mongodb stores the unique id they use uniquer "_". They always store _ in mongodb. Mongoose is a library
	//that talks to mongodb. Mongodb actually has the data. 
	//req.body.id because its by itself you can use this otherwise if its more than one it would grab multiple ids.
});///{songs:songs} needs to be consisten with edit.ejs line 9 were songs is at

//reminder /edit is in action edit.ejs file
app.post('/edit', function(req, res) {
	Music.findOneAndUpdate({_id:req.body.id}, req.body, function(){
		res.redirect('/');
	});
})

app.post('/delete', function(req, res) {
	Music.findByIdAndRemove(req.body.id, function(){
		res.redirect('/');
	});
})

// { "name" : "Apple Tree", "irrigationZone" : 14, "sunExposure" : "Medium", "_id" : ObjectId("56153f8d733c6d16126df041"), "__v" : 0 } so 
//everytime you press submit. 



//to make it live 
app.listen(3000);
console.log("Port is 3000");

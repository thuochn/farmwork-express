const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const pug = require("pug");
const shortid = require("shortid");

const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync('db.json');
const db = low(adapter);

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function(req, res) {
	res.render("index", {
		products: db.get('products').value()
	});
});

app.get("/create", function(req, res) {
	res.render("create")
});

app.post("/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get('products').push(req.body).write()
	res.redirect('/')
});

app.listen(port, function(req, res) {
	console.log("localhost:" + port)
});
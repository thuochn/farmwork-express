const express = require("express");
const app = express();
const pug = require("pug");
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync('db.json');
const db = low(adapter);

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get("/", function(req, res) {
	res.render("index", {
		products: db.get('products').value()
	});
});

app.listen(port, function(req, res) {
	console.log("localhost:" + port)
});
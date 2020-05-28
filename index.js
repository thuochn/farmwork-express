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

app.get("/books/create", function(req, res) {
	res.render("create")
});

app.post("/books/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get('products')
	.push(req.body)
	.write()
	res.redirect('/')
});

app.get("/books/search", function(req, res) {
	let q = req.query.q;
 	let matchedBook = db.get("products").value().filter(function(product) {
 		return product.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 	});
	res.render('index',{
 		products: matchedBook
	});
});

app.get("/books/view/:id", function(req, res) {
	let id = req.params.id;
	console.log(id);
 	let product = db.get('products').find({ id: id }).value();
 	res.render('view', {
 		product: product
 	});
});

app.get("/books/view/:id/delete",function(req, res) {
	let id = req.params.id;
	db.get('products')
	.remove({ id: id })
	.write()
	res.redirect("/");
});

app.post("/books/view/:id/update", function(req, res) {
	let id = req.params.id;
	let title = req.body.title;
	db.get('products')
	.find({ id: id })
	.assign({ title: title })
	.write()
	res.redirect("/")
 });

app.get("/users", function(req, res) {
	res.render('users/index',{
		users: db.get('users').value()
	});
});

app.get("/users/create", function(req, res) {
	res.render('users/create')
});

app.post("/users/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get('users')
	.push(req.body)
	.write()
	res.redirect('/users')
});

app.get("/users/search", function(req, res) {
	let q = req.query.q;
 	let matchedUser = db.get("users").value().filter(function(user) {
 		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 	});
	res.render('users/index',{
 		users: matchedUser
	});
});

app.get("/users/view/:id", function(req, res) {
	let id = req.params.id;
 	let user = db.get("users").find({ id: id }).value();
 	res.render('users/view', {
 		user: user
 	});
});

app.post("/users/view/:id/update", function(req, res) {
	let id = req.params.id;
	db.get('users')
	.find({ id: id })
	.assign({ name: req.body.name })
	.assign({ phonel: req.body.phonel })
	.assign({ date: req.body.date })
	.write()
	res.redirect("/users")
 });

app.get("/users/view/:id/delete", function(req, res) {
	let id = req.params.id;
	db.get('users')
	  .remove({ id: id })
	  .write()
	 res.redirect("/users")
})

app.listen(port, function(req, res) {
	console.log("localhost:" + port)
});
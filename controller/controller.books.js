const shortid = require("shortid");
const bodyParser = require('body-parser');
const db = require("../db");

module.exports.create = function(req, res) {
	res.render("create")
};

module.exports.postCreate =  function(req, res) {
	req.body.id = shortid.generate();
	db.get('products')
	.push(req.body)
	.write()
	res.redirect('/')
};

module.exports.search = function(req, res) {
	let q = req.query.q;
 	let matchedBook = db.get("products").value().filter(function(product) {
 		return product.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 	});
	res.render('index',{
 		products: matchedBook
	});
};

module.exports.view = function(req, res) {
	let id = req.params.id;
 	let product = db.get('products').find({ id: id }).value();
 	res.render('view', {
 		product: product
 	});
};

module.exports.delete = function(req, res) {
	let id = req.params.id;
	db.get('products')
	.remove({ id: id })
	.write()
	res.redirect("/");
};

module.exports.update = function(req, res) {
	let id = req.params.id;
	let title = req.body.title;
	db.get('products')
	.find({ id: id })
	.assign({ title: title })
	.write()
	res.redirect("/")
 };
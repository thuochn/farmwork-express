const express = require('express');
const shortid = require("shortid");
const bodyParser = require('body-parser');
const db = require("../db");

const router = express.Router();

router.get("/create", function(req, res) {
	res.render("create")
});

router.post("/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get('products')
	.push(req.body)
	.write()
	res.redirect('/')
});

router.get("/search", function(req, res) {
	let q = req.query.q;
 	let matchedBook = db.get("products").value().filter(function(product) {
 		return product.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 	});
	res.render('index',{
 		products: matchedBook
	});
});

router.get("/view/:id", function(req, res) {
	let id = req.params.id;
 	let product = db.get('products').find({ id: id }).value();
 	res.render('view', {
 		product: product
 	});
});

router.get("/view/:id/delete",function(req, res) {
	let id = req.params.id;
	db.get('products')
	.remove({ id: id })
	.write()
	res.redirect("/");
});

router.post("/view/:id/update", function(req, res) {
	let id = req.params.id;
	let title = req.body.title;
	db.get('products')
	.find({ id: id })
	.assign({ title: title })
	.write()
	res.redirect("/")
 });

 module.exports = router;
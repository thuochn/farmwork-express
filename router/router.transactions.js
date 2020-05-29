const express = require("express");
const shortid = require("shortid");
const bodyParser = require('body-parser');

const db = require("../db");
const router = express.Router();

router.get("/", function(req, res) {
	res.render("transaction/index", {
		products: db.get('products').value()
	});
});

router.get("/create", function(req, res) {
	res.render("transaction/create")
});

router.post("/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get('transactions')
	  .push(req.body)
	  .write();
	let bookId = req.body.bookId;
	db.get('products')
  	  .find({ title: bookId })
  	  .assign({ still: false })
  	  .write()
	res.redirect("/transactions")
});

module.exports = router;
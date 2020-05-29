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
	res.render("transaction/create", {
		transactions: db.get("transactions").value()
	})
});

router.post("/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get('transactions')
	  .push(req.body)
	  .write();
	let bookId = req.body.bookId;
	let date = req.body.date;
	db.get('products')
  	  .find({ title: bookId })
  	  .assign({ still: false })
  	  .write()
  	db.get('users')
  	  .find({ title: bookId })
  	  .assign({ date: date })
  	  .write()
	res.redirect("/transactions/create")
});

router.get("/:id/complete", function(req, res) {
	let id = req.params.id;
	let view = db.get("transactions").find({ id: id }).value();
	db.get('transactions')
  	  .remove({ id: id })
      .write()
     res.redirect("/transactions/create")
});

module.exports = router;
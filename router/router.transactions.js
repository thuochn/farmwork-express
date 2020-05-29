const express = require("express");

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

module.exports = router;
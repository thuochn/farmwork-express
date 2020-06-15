const db = require("../db");

module.exports.postCreate = function(req, res, next) {
	let errors = [];

	if(!req.body.userId) {
		errors.push("userId is require")
	}

	if(!req.body.bookId) {
		errors.push("bookId is require")
	}

	if(errors.length) {
		res.render("transaction/create", {
			transactions: db.get("transactions").value(),
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
};
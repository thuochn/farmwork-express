const express = require('express');
const shortid = require("shortid");
const bodyParser = require('body-parser');
const db = require("../db");

const router = express.Router();


router.get("/", function(req, res) {
	res.render('users/index',{
		users: db.get('users').value()
	});
});

router.get("/create", function(req, res) {
	res.render('users/create')
});

router.post("/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get('users')
	.push(req.body)
	.write()
	res.redirect('/users')
});

router.get("/search", function(req, res) {
	let q = req.query.q;
 	let matchedUser = db.get("users").value().filter(function(user) {
 		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 	});
	res.render('users/index',{
 		users: matchedUser
	});
});

router.get("/view/:id", function(req, res) {
	let id = req.params.id;
 	let user = db.get("users").find({ id: id }).value();
 	res.render('users/view', {
 		user: user
 	});
});

router.post("/view/:id/update", function(req, res) {
	let id = req.params.id;
	db.get('users')
	.find({ id: id })
	.assign({ name: req.body.name })
	.assign({ phonel: req.body.phonel })
	.assign({ date: req.body.date })
	.write()
	res.redirect("/users")
 });

router.get("/view/:id/delete", function(req, res) {
	let id = req.params.id;
	db.get('users')
	  .remove({ id: id })
	  .write()
	 res.redirect("/users")
});
module.exports = router;
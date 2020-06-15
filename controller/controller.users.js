const shortid = require("shortid");
const bodyParser = require('body-parser');
const db = require("../db");

module.exports.index = function(req, res) {
	res.render('users/index',{
		users: db.get('users').value()
	});
};

module.exports.create = function(req, res) {
	res.render('users/create')
};

module.exports.postCreate =  function(req, res) {
	req.body.id = shortid.generate();
	db.get('users')
	.push(req.body)
	.write()
	res.redirect('/users')
};

module.exports.search = function(req, res) {
	let q = req.query.q;
 	let matchedUser = db.get("users").value().filter(function(user) {
 		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 	});
	res.render('users/index',{
 		users: matchedUser
	});
};

module.exports.view = function(req, res) {
	let id = req.params.id;
 	let user = db.get("users").find({ id: id }).value();
 	res.render('users/view', {
 		user: user
 	});
};

module.exports.update = function(req, res) {
	let id = req.params.id;
	db.get('users')
	.find({ id: id })
	.assign({ name: req.body.name })
	.assign({ phonel: req.body.phonel })
	.assign({ date: req.body.date })
	.write()
	res.redirect("/users")
 };

 module.exports.delete = function(req, res) {
	let id = req.params.id;
	db.get('users')
	  .remove({ id: id })
	  .write()
	 res.redirect("/users")
};
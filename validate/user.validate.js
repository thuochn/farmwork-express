module.exports.postCreate = function(req, res, next) {
		let errors = [];

	if(!req.body.name) {
		errors.push("name is require")
	}

	if(!req.body.phonel) {
		errors.push("phonel is require")
	}

	if(errors.length) {
		res.render('users/create', {
			errors: errors,
			values: req.body
		});
		return;
	}

	if(req.body.name.length > 30) {
		res.render('users/create');
		return;
	}
	next();
};
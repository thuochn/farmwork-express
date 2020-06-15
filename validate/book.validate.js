module.exports.postCreate = function(req, res, next) {
	let errors = [];

	if(!req.body.title){
		errors.push("title is require")
	}

	if(!req.body.description){
		errors.push("description is require")
	}

	if(errors.length){
		res.render("create", {
			errors: errors,
			values: req.body
		});
			return;
	}
	next();
};
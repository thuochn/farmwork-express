const express = require("express");
const bodyParser = require('body-parser');
const pug = require('pug');

const userRouter = require("./router/router.users");
const bookRouter = require("./router/router.books");
const transactionRouter =require("./router/router.transactions");

const db = require("./db");

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function(req, res) {
	res.render("index", {
		products: db.get('products').value()
	});
});

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);

app.listen(port, function(req, res) {
	console.log("localhost:" + port)
});
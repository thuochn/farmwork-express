const express = require('express');

const controller = require("../controller/controller.books");
const validate = require("../validate/book.validate");

const router = express.Router();

router.get("/create", controller.create);

router.post("/create", validate.postCreate, controller.postCreate);

router.get("/search", controller.search);

router.get("/view/:id", controller.view);

router.get("/view/:id/delete", controller.delete);

router.post("/view/:id/update", controller.update);

 module.exports = router;
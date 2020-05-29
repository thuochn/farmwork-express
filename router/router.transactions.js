const express = require("express");
const shortid = require("shortid");
const bodyParser = require('body-parser');
const controller = require("../controller/controller.transactions");
const db = require("../db");
const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/:id/complete", controller.delete);

module.exports = router;
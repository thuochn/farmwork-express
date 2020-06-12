const express = require("express");

const controller = require("../controller/controller.transactions");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/:id/complete", controller.delete);

module.exports = router;
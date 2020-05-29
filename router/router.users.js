const express = require('express');

const router = express.Router();

const controller = require("../controller/controller.users");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",controller.postCreate);

router.get("/search", controller.search);

router.get("/view/:id", controller.view);

router.post("/view/:id/update", controller.update);

router.get("/view/:id/delete", controller.delete);
module.exports = router;
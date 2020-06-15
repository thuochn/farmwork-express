const express = require('express');

const controller = require("../controller/controller.users");
const validate = require("../validate/user.validate");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", validate.postCreate, controller.postCreate);

router.get("/search", controller.search);

router.get("/view/:id", controller.view);

router.post("/view/:id/update", controller.update);

router.get("/view/:id/delete", controller.delete);
module.exports = router;
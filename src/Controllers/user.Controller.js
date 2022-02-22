const { Router } = require("express");

const User = require("../Models/user.model");
const crudController = require("./crud.controller");

const router = Router();

router.get("", crudController(User, "User").get)






module.exports = router;
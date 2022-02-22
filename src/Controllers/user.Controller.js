const { Router } = require("express");

const User = require("../Models/user.model");

const router = Router();

router.get("", crudController(User, "User").get)






module.exports = router;
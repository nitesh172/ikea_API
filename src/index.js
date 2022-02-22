const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")

app.use(cors())

app.use(express.urlencoded({ extended: true }))


const userController = require("./Controllers/user.Controller");

app.use("/users", userController);

module.exports = app

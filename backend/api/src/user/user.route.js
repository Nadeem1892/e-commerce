const userController = require("./user.controller")

const userRoutes = require("express").Router()

userRoutes.post("/register", userController.create)


module.exports = userRoutes
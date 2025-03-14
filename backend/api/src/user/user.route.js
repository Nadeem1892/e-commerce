const userController = require("./user.controller")

const userRoutes = require("express").Router()

userRoutes.post("/register", userController.create)
userRoutes.post("/verify-email", userController.varifyEmail)


module.exports = userRoutes
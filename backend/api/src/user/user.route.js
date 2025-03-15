const auth = require("../../middleware/auth")
const userController = require("./user.controller")

const userRoutes = require("express").Router()

userRoutes.post("/register", userController.create)
userRoutes.post("/verify-email", userController.varifyEmail)
userRoutes.post("/login",userController.login)
userRoutes.get("/logout",auth, userController.logout)


module.exports = userRoutes
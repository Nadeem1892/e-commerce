const auth = require("../../middleware/auth")
const upload = require("../../middleware/multer")
const userController = require("./user.controller")

const userRoutes = require("express").Router()

userRoutes.post("/register", userController.create)
userRoutes.post("/verify-email", userController.varifyEmail)
userRoutes.post("/login",userController.login)
userRoutes.get("/logout",auth, userController.logout)
userRoutes.put("/upload-avatar", auth, upload.single('avatar'), userController.uploadAvatar)
userRoutes.post("/update-user", auth, userController.updateUserDetails)


module.exports = userRoutes
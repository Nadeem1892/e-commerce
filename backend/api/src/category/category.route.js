const auth = require("../../middleware/auth")
const categoryController = require("./category.controller")
const categoryRoutes = require("express").Router()
const upload = require("../../middleware/multer")



categoryRoutes.post("/add", upload.single('image'), categoryController.addCategory);


module.exports = categoryRoutes
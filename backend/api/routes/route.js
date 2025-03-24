const routes = require('express').Router()
const userRoutes = require('../src/user/user.route')
const categoryRoutes = require("../src/category/category.route")


routes.use("/user", userRoutes)
routes.use("/category", categoryRoutes)

module.exports = routes
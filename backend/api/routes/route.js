const routes = require('express').Router()
const userRoutes = require('../src/user/user.route')


routes.use("/user", userRoutes)

module.exports = routes
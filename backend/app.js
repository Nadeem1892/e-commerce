const express = require('express')
const app = express()
const routes = require('./api/routes/route');
var cors = require('cors')
require('./config/database')
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())

app.use("/", routes)

module.exports = app
const express = require('express')
const app = express()
const routes = require('./api/routes/route');
var cors = require('cors')
const cookieParser = require('cookie-parser');
require('./config/database')

// Use cookie-parser middleware before your routes
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Configure CORS (optional customization)
// const corsOptions = {
//     origin: 'http://your-frontend-domain.com',  // Replace with your frontend URL
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type,Authorization',
//     credentials: true,
// };

// app.use(cors(corsOptions))
app.use(cors({
    origin: "http://localhost:5173",  // Your frontend URL
    credentials: true,  // Allow cookies/credentials to be sent
  }));

app.use("/", routes)

module.exports = app
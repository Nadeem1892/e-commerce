const mongoose = require('mongoose')
require('dotenv').config()
const DB_URL = process.env.MONGODB_URL

if (!DB_URL) {
    throw new Error("Please provide MONGO_URL in the .env")
}

 mongoose.connect(DB_URL).then(res=>{
    console.log("Database Connected....")
 }).catch(err=>{
    console.log("Error while making connection with database server", err)
  })
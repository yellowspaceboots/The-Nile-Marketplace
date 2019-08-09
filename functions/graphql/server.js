// import mongoose from 'mongoose'
const mongodb = require('mongodb')

const dotenv = require('dotenv').config()
// Initialize connection to database
const dbUrl = process.env.DB_URL_DEV
const dbOptions = {
  useNewUrlParser: true
}
const db = mongodb.MongoClient.connect(dbUrl, dbOptions)
/*
const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  dbName: 'Elysium'
}
// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions)
const db = mongoose.connection
db.on('connected', console.error.bind(console, 'MongoDB connection successful!'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
*/
module.exports = db

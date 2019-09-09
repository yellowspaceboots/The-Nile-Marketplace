const mongoose = require('mongoose')

const dbUrl = process.env.DB_URL_DEV

const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  dbName: 'Elysium',
  useUnifiedTopology: true
}
// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions)
const db = mongoose.connection
db.on('connected', console.error.bind(console, 'MongoDB connection successful!'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db

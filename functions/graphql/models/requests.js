const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  requestId: Number,
  title: String,
  start: Date,
  end: Date,
  salesman: String,
  amount: Number,
  status: String,
  customers: [String]
})

module.exports = requestSchema

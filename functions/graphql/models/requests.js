const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  requestId: String,
  title: String,
  start: Date,
  end: Date,
  salesman: String,
  amount: Number,
  status: String,
  customers: [String],
  size: String
})

module.exports = requestSchema

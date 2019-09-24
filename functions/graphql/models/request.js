const mongoose = require('mongoose')
const CustomerSchema = require('./customer.js')

const requestSchema = new mongoose.Schema({
  requestId: String,
  title: String,
  start: Date,
  end: Date,
  salesman: String,
  amount: Number,
  status: String,
  customers: [CustomerSchema],
  size: String
})

module.exports = requestSchema

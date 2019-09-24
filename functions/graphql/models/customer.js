const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  account: Number,
  salesmanNumber: String,
  keyAccountId: String,
  name: String
})

module.exports = customerSchema

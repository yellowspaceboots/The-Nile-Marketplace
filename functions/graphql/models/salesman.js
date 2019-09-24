const mongoose = require('mongoose')

const salesmanSchema = new mongoose.Schema({
  number: String,
  name: String,
  type: String
})

module.exports = salesmanSchema

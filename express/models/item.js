var mongoose = require('mongoose')
var Schema = mongoose.Schema

var itemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  deadline: Date,
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  status: {
    type: Number,
    required: true,
    min: 0,
    max: 2
  }
})

var model = (process.env.NODE_ENV !== 'test') ? 'item' : 'testitem'
module.exports = mongoose.model(model, itemSchema)

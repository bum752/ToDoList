var mongoose = require('mongoose')
var Schema = mongoose.Schema

var itemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  deadline: Date,
  priority: {
    type: Number,
    default: 3,
    max: 5
  },
  done: {
    type: Boolean,
    default: false
  }
})

var model = (process.env.NODE_ENV !== 'test') ? 'item' : 'testitem'
module.exports = mongoose.model(model, itemSchema)

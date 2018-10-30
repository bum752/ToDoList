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

module.exports = mongoose.model('item', itemSchema)

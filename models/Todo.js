const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})
//id не нужно передается по умолчанию
module.exports = model('Todo', schema)

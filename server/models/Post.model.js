const {model, Schema, Schema: {Types: { ObjectId } }} = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  comments: [
    {
      type: ObjectId,
      ref: 'comments'
    }
  ]
})

module.exports = model('posts', postSchema)

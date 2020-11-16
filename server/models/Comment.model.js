const {model, Schema, Schema: {Types: { ObjectId } }} = require('mongoose')

const commentSchema = new Schema({
  name: {
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
  postId: {
    ref: 'posts',
    type: ObjectId
  }
})

module.exports = model('comments', commentSchema)

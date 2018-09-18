import mongoose from 'mongoose'

const articlesSchema = new mongoose.Schema({
  title: String,
  date: { type: Date, default: Date.now },
  columnId: {
    type: mongoose.Schema.ObjectId,
    ref: 'columns'
  },
  columnName: String,
  tags: Object,
  abstract: String,
  content: String
}, {
  versionKey: false
})

const Article = mongoose.model('articles', articlesSchema)

export default Article

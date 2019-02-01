import mongoose from 'mongoose'

const sourceSchema = new mongoose.Schema({
  src: String,
  date: { type: Date, default: Date.now },
  isBanner: Boolean
}, {
  versionKey: false
})

const Source = mongoose.model('source', sourceSchema)

export default Source

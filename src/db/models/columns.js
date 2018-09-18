import mongoose from 'mongoose'

const columns = new mongoose.Schema({
  title: String,
  subTitle: String,
  icon: String,
  temp: String,
  tags: Object
}, {
  versionKey: false
})

const Columns = mongoose.model('columns', columns)

export default Columns

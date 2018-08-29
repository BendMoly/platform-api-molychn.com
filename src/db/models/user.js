import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  account: String
})

const Users = mongoose.model('test', adminSchema)

export default Users
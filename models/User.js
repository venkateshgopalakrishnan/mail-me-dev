const mongoose = require('mongoose')
// const Schema = mongoose.Schema has been replaced by the below line of code(ES 2015)
const {Schema} = mongoose

const userSchema = new Schema({
    identity: String
})

mongoose.model('Users', userSchema)
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    linkedinID: String,
})

mongoose.model('Users', userSchema)
const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name: String,
    author: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'users'}
})

const songModel = mongoose.model('songs', songSchema)

module.exports = { songModel }
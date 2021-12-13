const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    posts:{
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('Chat', chatSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    clp_balance: {
        type: Number,
        defaut: 0,
    },
    cabildo_balance: {
        type: Number,
        defaut: 0,
    },
    listAccounts:{
        type: [Number],
        default: [],
    },
});

module.exports = mongoose.model('User', userSchema);
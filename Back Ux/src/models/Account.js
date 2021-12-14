const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    nAccount:{
        type: Number,
        required: true
    },
    clp_balance: {
        type: Number,
        defaut: 0,
    },
    cabildo_balance: {
        type: Number,
        defaut: 0,
    },
    transferHistory:{
        type: [String],
        default: [],
    },
    chat:{
        type: [String],
        default: [],
    },
    listUsers:{
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('Account', accountSchema);
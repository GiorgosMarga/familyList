const mongoose = require('mongoose')

const Item = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide name"]
    },
    price: {
        type: Number,
    },
    market: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    listId: {
        type: String
    },
    quantity:{
        type: Number,
        default:1
    }
}, {timestamps: true})

module.exports = mongoose.model('item', Item);
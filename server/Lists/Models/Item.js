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
        ref: 'user',
        required: true
    },
    listId: {
        type: String
    },
    quantity:{
        type: Number,
        default:1
    },
    deleted: {
        type: Boolean,
        default:false
    }
}, {timestamps: true})

module.exports = mongoose.model('item', Item);
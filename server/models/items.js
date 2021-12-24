const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'users'
    },
    name : {
        type : String,
        required : true
    }
}, {timestamps : true})
const Items = new mongoose.model("todo",Schema)
module.exports = Items
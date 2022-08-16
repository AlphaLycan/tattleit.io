const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    clgN:{
        type: String,
        require: true,
    },
    userEmail:{
        type: String,
        require: true,
    },

    chatt: {
        type: String,
        required: false
    }
})

const Chat = mongoose.model('Chat', postSchema);
module.exports = Chat;
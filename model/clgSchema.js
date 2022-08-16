const mongoose = require('mongoose');

const clgSchema = new mongoose.Schema({
    
    collegeName: {
        type: String,
        required: true
    }
})

const clg = mongoose.model('clg', clgSchema);
module.exports = clg;
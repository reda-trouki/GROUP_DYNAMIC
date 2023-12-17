const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'topics',
        },
    ],
});

const Element = mongoose.model('elements', elementSchema,'element');

module.exports = Element;

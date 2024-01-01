const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
    }
});

const Topic = mongoose.model('Topic', topicSchema, 'topics');

module.exports = Topic;
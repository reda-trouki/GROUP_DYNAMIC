const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false, // Provide a default value or handle it according to your application logic
    },
});

const Topic = mongoose.model('topics', topicSchema,'topic');

module.exports = Topic;

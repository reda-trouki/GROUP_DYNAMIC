const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: '',
    },
    progress: [
        {
            elementId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Element',
            },
            completedTopics: [Boolean], // assuming there are 7 topics per element
        },
    ],
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
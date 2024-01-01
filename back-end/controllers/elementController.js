const Element = require('../models/element');
const Topic = require('../models/topic');
const User = require('../models/user');

async function getElementById(req, res) {
    try {
        const AuthUser = req.user;
        const elementId = req.params.id;

        // Find the user by ID
        const user = await User.findById(AuthUser._id);

        if (!user) {
            throw new Error('User not found');
        }

        // Find the element by ID
        const element = await Element.findById(elementId).populate('topics');

        if (!element) {
            return res.status(404).json({ message: 'Element not found' });
        }

        // Find user progress for the element
        const elementProgress = user.progress.find(
            (progress) => progress.elementId.toString() === element._id.toString()
        );

        // Get topics details and completion status for the user
        const topicsWithCompletionStatus = await Promise.all(
            element.topics.map(async (topicId, index) => {
                const topic = await Topic.findById(topicId);
                const completed = elementProgress.completedTopics[index];
                return {
                    topicId: topic._id,
                    title: topic.title,
                    num: topic.number,
                    completed: completed,
                };
            })
        );

        return res.status(200).json({
            elementId: element._id,
            title: element.title,
            topics: topicsWithCompletionStatus,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching element' });
        console.error('Error fetching element:', error.message);
        throw error;
    }
}

module.exports = {
    getElementById
};
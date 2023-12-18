const Element = require('../models/element');
const Topic = require('../models/topic');

const getElementById = async (req, res) => {
    try {
        const elements = await Element.find({ _id: req.params.id });

        if (elements.length === 0) {
            return res.status(404).json({ message: 'Element not found' });
        }

        const elementsTopics = await Promise.all(elements.map(async (element) => {
            const topics = await Topic.find({ _id: { $in: element.topics } }).lean();
            return { ...element.toObject(), topics };
        }));

        res.json(elementsTopics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving elements', error: error.message });
    }
};


const getCompletedElements = async (req, res) => {
    try {
        const elements = await Element.find({ progress: 100 });
        const elementsTopics = await Promise.all(elements.map(async (element) => {
            const topics = await Topic.find({ _id: { $in: element.topics } }).lean();
            return { ...element.toObject(), topics };
        }));
        res.json(elementsTopics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving elements', error: error.message });
    }
};


const getInprogressElements = async (req, res) => {
    try {
        const elements = await Element.find({ progress: { $ne: 100 } });
        const elementsTopics = await Promise.all(elements.map(async (element) => {
            const topics = await Topic.find({ _id: { $in: element.topics } }).lean();
            return { ...element.toObject(), topics };
        }));
        res.json(elementsTopics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving elements', error: error.message });
    }
};
module.exports = {
    getCompletedElements,
    getInprogressElements,
    getElementById
};
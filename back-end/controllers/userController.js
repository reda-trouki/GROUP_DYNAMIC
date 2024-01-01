const User = require('../models/user'); // Assuming the User model is in the models folder
const Element = require('../models/element');
const Topic = require("../models/topic")
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt');

// Controller to handle user login
const login = async (req, res) => {
    try {
        console.log(req.body)
        
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        // Compare the password stored in the database with the password entered by the user
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!user || !passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        console.log('User logged in:', user.userName);

        const accessTooken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({ user:{...user,password:""} ,message: 'Loged in succefully', accessToken: accessTooken });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Merge firstName and lastName to create userName
        const userName = `${ firstName } ${ lastName }`;

        // Create a new user object
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, // Store the hashed password
            progress: [], // Initialize progress array
        });

        // Fetch all elements from the database
        const allElements = await Element.find();

        // Initialize progress for each element with default values
        newUser.progress = allElements.map((element) => ({
            elementId: element._id,
            completedTopics: Array(element.topics.length).fill(false),
        }));

        // Save the user to the database
        await newUser.save();

        console.log('User registered:', userName);

        const accessToken = jwt.sign(newUser.toJSON(), process.env.ACCESS_TOKEN_SECRET);

        res.status(200).json({
            user: { ...newUser.toObject(), password: "" }, // Convert to plain object to remove mongoose metadata
            message: 'Logged in successfully',
            accessToken,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


async function getCompletedElementsOfUser(req, res) {
    try {
        const AuthUser = req.user;

        // Find the user by ID
        const user = await User.findById(AuthUser._id);

        if (!user) {
            throw new Error('User not found');
        }

        // Filter completed elements with 100% progress
        const completedElements = user.progress.filter((elementProgress) =>
            elementProgress.completedTopics.every((topicCompleted) => topicCompleted === true)
        );

        // Extract element IDs from completedElements
        const completedElementIds = completedElements.map((elementProgress) => elementProgress.elementId);

        // Find and return the completed elements with 100% progress
        const elementsWithProgress = await Element.find({
            _id: { $in: completedElementIds },
        });

        // Calculate progress for each element based on completed topics
        const elementsWithCalculatedProgress = await Promise.all(
            elementsWithProgress.map(async (element) => {
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
                            completed: completed,
                        };
                    })
                );

                const completedTopicCount = topicsWithCompletionStatus.reduce(
                    (count, topic) => count + (topic.completed ? 1 : 0),
                    0
                );

                // Assuming 7 topics per element
                const totalTopics = 7;
                const progressPercentage = Math.round((completedTopicCount / totalTopics) * 100);

                return {
                    elementId: element._id,
                    title: element.title, // Adjust based on your element model
                    progress: progressPercentage,
                    topics: topicsWithCompletionStatus,
                };
            })
        );

        return res.status(200).json({ elementsWithProgress: elementsWithCalculatedProgress });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching elements' });
        console.error('Error fetching completed elements:', error.message);
        throw error;
    }
}

async function getIncompletedElementsOfUser(req, res) {
    try {
        const AuthUser = req.user;

        // Find the user by ID
        const user = await User.findById(AuthUser._id);

        if (!user) {
            throw new Error('User not found');
        }

        // Filter incompleted elements
        const incompletedElements = user.progress.filter((elementProgress) =>
            elementProgress.completedTopics.some((topicCompleted) => topicCompleted === false)
        );

        // Extract element IDs from incompletedElements
        const incompletedElementIds = incompletedElements.map((elementProgress) => elementProgress.elementId);

        // Find and return the incompleted elements
        const elementsWithProgress = await Element.find({
            _id: { $in: incompletedElementIds },
        });

        // Calculate progress for each incompleted element based on completed topics
        const elementsWithCalculatedProgress = await Promise.all(
            elementsWithProgress.map(async (element) => {
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

                const completedTopicCount = topicsWithCompletionStatus.reduce(
                    (count, topic) => count + (topic.completed ? 1 : 0),
                    0
                );

                // Assuming 7 topics per element
                const totalTopics = 7;
                const progressPercentage = Math.round((completedTopicCount / totalTopics) * 100);

                return {
                    elementId: element._id,
                    title: element.title, // Adjust based on your element model
                    progress: progressPercentage,
                    topics: topicsWithCompletionStatus,
                };
            })
        );

        return res.status(200).json({ elementsWithProgress: elementsWithCalculatedProgress });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching elements' });
        console.error('Error fetching incompleted elements:', error.message);
        throw error;
    }
}



module.exports = { login, register, getCompletedElementsOfUser, getIncompletedElementsOfUser };

const User = require('../models/user'); // Assuming the User model is in the models folder
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

        res.status(200).json({ message: 'Loged in succefully', accessToken: accessTooken });
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
        const userName = `${firstName} ${lastName}`;

        // Create a new user object
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, // Store the hashed password
        });

        // Save the user to the database
        await newUser.save();

        console.log('User registered:', userName);

        const accessTooken = jwt.sign(newUser.toJSON(), process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({ message: 'Loged in succefully' ,accessToken: accessTooken });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { login, register };

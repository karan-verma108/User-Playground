const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const { getData } = require('./dbController');

//Home route
router.get('/', (req, res) => {
    res.send('Hello from express server!');
});

//Register route
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    //If user left any field empty
    if (!name || !email || !phone || !password) {
        return res.status(422).json({ msg: 'Please fill the details completely!' });
    }

    //If user already exists
    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ msg: 'User already exists!' });
        }

        //If user already doesn't exist that means we have to create a new user
        else {
            const newUser = new User({ name, email, phone, password });
            await newUser.save();
            return res.status(201).json({ msg: 'User registered successfully!' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' });
    }
});


//Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //Checking if user left any field empty
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please fill your credentials completely!' });
    }

    //Checking if the email entered by user on login page exists in our database or not
    try {
        let userDetails = await User.findOne({ email: email });
        // console.log(userDetails);

        if (userDetails) {
            let passwordMatched = await bcrypt.compare(password, userDetails.password);

            if (!passwordMatched) {
                return res.status(400).json({ msg: 'Invalid credentials(password wrong)!' });
            } else {
                return res.status(200).json({ msg: 'Login successfull!' });
            }
        } else {
            return res.status(400).json({ msg: 'Invalid credentials(email wrong)' });
        }
    } catch (error) {
        console.log(error);
    }
});

// Get users route
router.get('/users', async (req, res) => {
    let query = {}
    try {
        let collection = 'users';
        let output = await getData(collection, query);
        res.send(output)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
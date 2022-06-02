const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = "Kanha@8827";



// ROUTE 1: Create a User using: POST "/api/auth/createUser". No login required.
router.post('/createUser', [
    body('name', 'Name cannot be less than three 3 characters').isLength({ min: 3 }),
    body('email', 'The Email Provided is not Valid').isEmail(),
    body('password', 'Password should contain at least 8 characters.').isLength({ min: 8 }),
],
    async (req, res) => {
        let success = false;
        // If there are errors, return Bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            // Check wheather the user with this email exists already.
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                res.status(400).json({ success, error: "Sorry, A User With This Email Already Exists." })
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)

            // Create a new User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken })

        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ success, error: "Internal Server Error!" })
        }
    })



// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required.
router.post('/login', [
    body('email', 'The Email Provided is not Valid').isEmail(),
    body('password', 'The Password Cannot Be Blank').exists()
],
    async (req, res) => {
        success = false;
        // If there are errors, return Bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const {email, password} = req.body;

        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success, error: "Invalid Credentials!"})
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Invalid Credentials!"})
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken })

        }
        catch (error) {
            console.error(error.message);
            res.status(500).json( {success, error: "Internal Server Error!"} )
        }

    })

// ROUTE 3: Get loggedIn User Details using: POST "/api/auth/getUser". Login required.
router.post('/getUser', fetchUser, async (req, res) => {
        let success = false;
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            success = true;
            res.send({success, user})

        }
        catch (error) {
            console.error(error.message);
            res.status(500).send( {success, error: "Internal Server Error!"})
        }

    })

module.exports = router;

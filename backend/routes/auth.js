const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');


// Create a User using: POST "/api/auth". Doesnt Require Auth
router.post('/', [
    body('name', 'Name cannot be less than three 3 characters').isLength({ min: 3 }),
    body('email', 'The Email Provided is not Valid').isEmail(),
    body('password', 'Password should contain at least 8 characters.').isLength({ min: 8 }),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          }).then(user => res.json(user))
          .catch(()=>{
              console.log("The Given Email Already Exists");
              res.send({error: "The Given Email Already Exists"});
          })
    })

module.exports = router;

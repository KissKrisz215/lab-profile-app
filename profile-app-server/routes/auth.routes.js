const express = require("express");
const User = require('../models/User.model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const {isAuthenticated} = require("../middlewares/jwt.middleware");

router.post("/signup", (req,res,next) => {
    const {password,username} = req.body;

    if(password === undefined || username === undefined){
        res.status(400).json({message: 'Please Provide Inputs'});
        return;
    }

    if(password === '' || username === ''){
        res.status(400).json("Please provide Inputs");
        return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!passwordRegex.test(password)){
        res.status(400).json({message: "Please provide a valid password"});
        return;
    }

    User.findOne({username})
    .then((foundUser) => {
        if(foundUser){
            res.status(400).json({message: "User already exists"});
            return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return User.create({password: hashedPassword,username})

    })
    .then((createdUser) => {
        console.log(createdUser);
        const {password, username} = createdUser;
        const user = {password, username};

        res.status(200).json({user: user});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    })

})

router.post("/login", (req,res,next) => {
    const {username, password } = req.body;

    if(username === undefined || password === undefined || username === '' || password === ''){
        res.status(401).json({message: 'User not found'});
        return;
    }

    User.findOne({username})
    .then((foundUser) => {
        if(!foundUser){
            res.status(401).json({message: 'User not found'});
            return;
        }

        const passwordCompare = bcrypt.compareSync(password, foundUser.password);

        if(passwordCompare){
            const {_id, username} = foundUser;

            const payload = {_id, username};

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {algorithm: 'HS256', expiresIn: '6h'}
            );

            res.status(200).json({authToken: authToken});

        }

    })
    .catch((err) => {
        res.status(500).json({message: "Internal Server Error"});
    })
})

router.get("/verify",isAuthenticated, (req,res,next) => {
   console.log(req.payload);
   res.status(200).json(req.payload);
})

module.exports = router;
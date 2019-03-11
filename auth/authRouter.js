const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkUserInfo } = require('./authMiddleware');
const { generateToken } = require('./serviceJWT');
const users = require('../models/users');

router.post('/register', checkUserInfo, async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    try{
        const newUser = await users.addUser(user)
        console.log(newUser)
        if(newUser) {
            const token = generateToken(newUser);
            res.status(201).json({message: 'User created successfully', newUser, token})
        } else {
            res.status(406).json({message: 'There was an issue with your request, Please try again!'})
        }
    }
    catch(error){
        if(error.errno === 19){
            res.status(406).json({message: 'Username taken. Please try again'})
        } else {
            res.status(500).json({message: 'We are working on the error!'})
        }
    }
})

router.post('/login', checkUserInfo, async (req, res) => {
    try{

    }
    catch(error){

    }
})

module.exports = router;
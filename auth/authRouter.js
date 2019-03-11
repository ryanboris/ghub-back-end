const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkUserInfo } = require('./authMiddleware');
const { generateToken } = require('./serviceJWT');
const users = require('../routes/users/usersModel');

// REGISTER ROUTE --- Sends back a JWT and Hashes the PW sent by client
router.post('/register', checkUserInfo, async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    try{
        const newUser = await users.addUser(user)
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

// LOGIN ROUTE - Checks if username is in database and verifies PW sent matches hashed PW in DB
router.post('/login', checkUserInfo, async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await users.findBy(username)
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)
            res.status(202).json({message: `User verified, Welcome ${user.username}`, token})
        } else {
            res.status(406).json({message: 'Invalid Credentials, Please try again!'})
        }
    }
    catch(error){
        res.status(500).json({message: 'We are working on the issue.'})
    }
})

module.exports = router;
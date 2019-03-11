const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../../database/dbConfig.js');

const router = express.Router();

const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

router.post('/register', (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 12);
    
        db('users')
            .insert(req.body)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(400).json({
                    message: "Bad request due to SQL contraint",
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not register user",
            error
        })
    }
});

router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
    
        db('users')
            .where({ username })
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const token = generateToken(user);
                    res.status(200).json({
                        message: `Welcome ${user.username}`,
                        token
                    })
                }else{
                    res.status(401).json({ message: "Invalid credentials" })
                }
            })
            .catch(error => {
                res.status(400).json({
                    message: "Bad request, please provide a username and password",
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not login user",
            error
        })
    }
});

module.exports = router;
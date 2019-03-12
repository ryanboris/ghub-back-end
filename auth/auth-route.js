const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig.js');
const { restricted } = require('./authMiddleware.js');

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
                        token,
                        userData: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
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

router.get('/users', restricted, (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not get users",
                error
            })
        })
});

router.get('/users/:id', restricted, (req, res) => {
    db('users')
        .where({ id: req.params.id })
        .first()
        .then(user => {
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({
                    message: "Could not find user with given id"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not get users",
                error
            })
        })
});

module.exports = router;
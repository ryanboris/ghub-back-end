const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-helpers.js');
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
    
        db.insert(req.body)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(400).json({
                    message: "Bad request due to SQL contraint.",
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not register user.",
            error
        })
    }
});

router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
    
        db
            .findByUsername(username)
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
                    res.status(401).json({ message: "Invalid credentials." })
                }
            })
            .catch(error => {
                res.status(400).json({
                    message: "Bad request, please provide a username and password.",
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not login user.",
            error
        })
    }
});

router.get('/users', restricted, (req, res) => {
    db
        .get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not get users.",
                error
            })
        })
});

router.get('/users/:id', restricted, (req, res) => {
    db
        .findById(req.params.id)
        .then(user => {
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({
                    message: "Could not find user with given id."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not get users.",
                error
            })
        })
});

router.put('/users/:id', restricted, (req, res) => {
    if(req.body.password){
        res.status(401).json({
            message: "You are unauthorized to change the password."
        })
    }
    try {
        db.update(req.params.id, req.body)
            .then(count => {
                if(count){
                    res.status(200).json({
                        message: `User with id ${req.params.id} was updated.`
                    })
                }else{
                    res.status(404).json({
                        message: "Could not find user with given id."
                    })
                }
            })
            .catch(error => {
                res.status(400).json({
                    message: "Could not update user due to bad request.",
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not update user.",
            error
        })
    }
});

router.delete('/users/:id', restricted, (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if(count){
                res.status(204).end();
            }else{
                res.status(404).json({
                    message: "Could not find user with given id."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not delete user.",
                error
            })
        })
});

module.exports = router;
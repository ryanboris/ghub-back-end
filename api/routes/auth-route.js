const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../database/dbConfig.js');

const router = express.Router();

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

module.exports = router;
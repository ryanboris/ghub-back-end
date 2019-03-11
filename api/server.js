const express = require('express');
const server = express();
const authRoutes = require('../auth/authRouter');
const middlewareConfig = require('./serverMiddleware');
const userRoutes = require('../routes/users/users');

middlewareConfig(server);
server.use('/api/auth', authRoutes)
server.use('/api/users', userRoutes)
module.exports = server;
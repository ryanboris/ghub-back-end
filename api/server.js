const express = require('express');
const server = express();
const authRoutes = require('../auth/authRouter');
const middlewareConfig = require('./serverMiddleware');

middlewareConfig(server);
server.use('/api/auth', authRoutes)

module.exports = server;
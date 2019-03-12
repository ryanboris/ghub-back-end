const express = require('express');
const applyMiddleware = require('./middleware.js');

const authRoute = require('../auth/auth-route.js');
const githubRoute = require('../github/github-route.js');

const server = express();
applyMiddleware(server);

server.use('/api/auth', authRoute);
server.use('/api/github', githubRoute);

module.exports = server;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoute = require('./routes/auth-route.js');
const githubRoute = require('./routes/github-route.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRoute);
server.use('/api/github', githubRoute);

module.exports = server;
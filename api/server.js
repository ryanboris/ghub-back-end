const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const authRoutes = require('../auth/authRouter');

server.use(logger());
server.use(cors());
server.use(helmet());
server.use('/api/auth', authRoutes)
module.exports = server;
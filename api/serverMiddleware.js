const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");

module.exports = server => {
  server.use(logger());
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};

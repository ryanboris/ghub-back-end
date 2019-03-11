const knex = require('knex');
const knexConfig = require('../knexfile');
const dbENV = process.env.DBENV || 'development';
const db = knex(knexConfig[dbENV]);

module.exports = db;
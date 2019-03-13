const db = require('../database/dbConfig.js');

module.exports = {
    get,
    insert,
    findById,
    findByUsername,
    update
}

function get(){
    return db('users')
}

function insert(user){
    return db('users')
        .insert(user)
}

function findById(id){
    return db('users').where({ id }).first()
}

function findByUsername(username){
    return db('users').where({ username }).first()
}

function update(id, updated){
    return db('users')
        .where({ id })
        .first()
        .update(updated)
}
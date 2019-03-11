const db = require('../data/dbConfig');

module.exports = {
    addUser,
}

async function addUser(user){
    const [id] = await db('users').insert(user);
    return db('users').where({id}).first();
}
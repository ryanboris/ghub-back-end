const db = require('../../data/dbConfig');

module.exports = {
    addUser,
    findBy,
    getUsers
}

async function addUser(user){
    const [id] = await db('users').insert(user);
    return db('users').where({id}).first();
}

async function findBy(filter){
    const user = db('users').where({username: filter}).first()
    return user
}

function getUsers(){
    return db('users')
}
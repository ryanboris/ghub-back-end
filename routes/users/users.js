const router = require('express').Router();
const users = require('./usersModel');
const {restricted} = require('../../auth/authMiddleware');

router.get('/',restricted, async (req, res) => {
    try{
        const dbUsers = await users.getUsers();
        if(dbUsers.length > 0) {
            res.status(200).json(dbUsers);
        } else {
            res.status(404).json({message: 'Looks like there are no users!'})
        }
    }
    catch(error){
        res.status(500).json({message: 'We are working on the issue.'})    
    }
})
module.exports = router;
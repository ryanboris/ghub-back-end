const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkUserInfo } = require('./authMiddleware');

router.post('/register', checkUserInfo, async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    try{

    }
    catch(error){

    }
})

router.post('/login', checkUserInfo, async (req, res) => {
    try{

    }
    catch(error){

    }
})

module.exports = router;
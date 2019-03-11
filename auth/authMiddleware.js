module.exports = { checkUserInfo }

function checkUserInfo(req, res, next) {
    if(req.body.username && req.body.password){
        next();
    } else {
        res.status(400).json({message: 'Please enter a valid username and password'})
    }
}
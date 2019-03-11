const jwt = require('jsonwebtoken');
module.exports = { checkUserInfo, restricted }

// CHECKING that users enter valid username and password
function checkUserInfo(req, res, next) {
    if(req.body.username && req.body.password){
        next();
    } else {
        res.status(400).json({message: 'Please enter a valid username and password'})
    }
}

// RESTRICTING users with no JWT 
function restricted(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, 's', (err, decodedToken) => {
            if(decodedToken) {
                next();
            } else {
                res.status(403).json({message: 'There is an issue with the info provided. Please try again'});
            }
        })
    } else {
        res.status(400).json({message: 'Please login to view users'})
    } 
}
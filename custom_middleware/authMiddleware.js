const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.status(401).json({ message: "Token is either expired or wrong, oops" })
            }else{
                req.decodedJwt = decodedToken;
                next();
            }
        })
    }else{
        res.status(401).json({
            message:"You must log in to do this."
        })
    }
}

module.exports = {
    restricted
}
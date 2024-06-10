/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a hello message
 */
const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    jwt.verify(token, process.env.JWTSecretKey, (err, decoded) => {
        console.log(err);
        if (err) {
            if (err.name === 'TokenExpiredError') {
                req.clearCookies(token)
                 return res.status(401).json({ error: 'Token expired. Please log in again.' });
            }
            return res.status(401).json({ error: 'Invalid token.' });
        }
        req.user = decoded;
        next();
    });
};


const checkToken = (req,res,next) => {
    const token = req.cookies.token;
    if (token) {
        
       return res.redirect('/')
    }
    next()
}

const mustLogin = (req,res,next)  => {
    const token =  req.cookies.token
    if (!token) {
        console.log('no token');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    req.user = jwt.verify(token, process.env.JWTSecretKey)
    next()
}
module.exports = {
    verifyToken,
    checkToken,
    mustLogin,
};

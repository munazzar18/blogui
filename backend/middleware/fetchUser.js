const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.USER_JWT_SECRET_KEY;

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token')

    if (!token){
        res.status(401).send({message: 'This token is not valid'})
    }
    try {
        const data = jwt.verify(token , JWT_SECRET)
        req.user = data.user
        next()

    } catch (err) {
        res.status(401).send({err : 'Token is not matched'})
    }
}

module.exports = fetchUser
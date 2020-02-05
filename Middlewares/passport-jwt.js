require('dotenv').config()
const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const options = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey : process.env.TOKEN_SECRET
}
passport.use(
    new JWTStrategy(options,(jwtPayload) =>{
        return jwtPayload._id
    })
)
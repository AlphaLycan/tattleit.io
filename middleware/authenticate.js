const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')
const Authenticate = async (req, res, next) =>{
        try {
            
            const token = req.cookies.jwtoken;
            const verifytoken = jwt.verify(token, process.env.SECRET_KEY)
            const verifyuser = await User.findOne({_id:verifytoken._id, "tokens.token":token})

            if (!verifyuser){throw new Error("user not found")}

            req.token = token;
            req.verifyuser = verifyuser;
            req.UserID = verifyuser._id;

            next();

        } catch (error) {
            res.status(401).send("Unauthorized login")
        }
}

module.exports = Authenticate;

const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = async (req, res, next) => {

    try {
        const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer") 
            ? req.headers.authorization.split(" ")[1]
            : null;

        if(!token) {
            return res.status(401).json({ message : "No token"});
        }

        const payload = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("payload", payload);
        req.auth = {...payload};
        next();          

    } catch(err) {
        return res.status(500).json({ error : err.message});
    }
}

module.exports = jwtAuthMiddleware;
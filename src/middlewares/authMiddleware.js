import { verifyAccessToken } from "../utils/tokenUtil.js";

const authenticate  = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({ message: 'no token provided' });
    }
    const token = authHeader.split(' ')[1];
    try{
        req.user = verifyAccessToken(token);
        next();
    }
    catch (err) {
        res.status(403).json({ message: 'Invalid token'});
    }
};

// Authorize admin middleware
const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Access denied, admin only'});
    }
};

export { authenticate, authorizeAdmin };
// This code defines an authentication middleware for Express.js that verifies the access token from the request header 
// and checks if the user has admin privileges. If the token is valid, it attaches the user information to the request object; 
// otherwise, it sends an error response.
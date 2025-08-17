import jwt from 'jsonwebtoken';
import {SECRET} from '../config.js'

if (!SECRET) {
  console.error("❌ SECRET is missing. Check your .env file and dotenv.config()");
  process.exit(1);
}
export const authenticateToken = (req,res,next)=> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
console.log(SECRET)
    jwt.verify(token, SECRET, (err, member) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.member = member;
        next();
    })
}
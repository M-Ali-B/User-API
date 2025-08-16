import jwt from 'jsonwebtoken';

const SECRET = 'your_secret_key_here';

export const authenticateToken = (req,res,next)=> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    })
}
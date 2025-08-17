export const authorizeRole = (role) => {
    return (req,res,next) => {
        if (!req.member || req.member.role !== role) {
            return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
        }
        next();
    }
}
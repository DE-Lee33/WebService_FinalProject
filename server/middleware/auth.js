const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: '토큰 없음' });
    }

    try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'secretKey');
        
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: '토큰 오류' });
    }
};

module.exports = authMiddleware;
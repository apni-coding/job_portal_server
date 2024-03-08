const jwt = require('jsonwebtoken');
const { ERROR } = require('../response_messages/statusCode');
const { USER_NOT_AUTHORIZED } = require('../response_messages/errorMessage');

const isToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization || req.headers.Authorization || null;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
        return res.status(ERROR).json({ error: USER_NOT_AUTHORIZED });
    }

    const token = authorizationHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWTKEY);
        if (decoded.userType !== 'applicant') {
            return res.status(ERROR).json({ error: USER_NOT_AUTHORIZED });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(ERROR).json({ error: USER_NOT_AUTHORIZED });
    }
};

module.exports = { isToken };

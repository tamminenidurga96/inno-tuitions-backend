const jwt = require('jsonwebtoken');

// Secret key from environment variable for consistency across the application
const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

module.exports = function (req, res, next) {
    try {
        const token = req.header('x-token');
        if (!token) {
            return res.status(400).json({ error: 'Token not provided' });
        }

        // Verify the token using the JWT secret key
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user; // Attach the decoded user ID to the request object
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);

        // Handle token-specific errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please login again.' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({ error: 'Invalid token, please provide a valid token.' });
        }

        // Generic server error handling
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

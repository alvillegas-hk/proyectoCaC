const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../config/db.config');
const UNAUTHORIZED = 401;

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    const getUserQuery = 'SELECT * FROM users WHERE username = ?';
    
    try {
        const [rows] = await database.promise().query(getUserQuery, [username]);
        const foundUser = rows[0];
        
        if (!foundUser) {
            return res.sendStatus(UNAUTHORIZED); // Unauthorized
        }

        const match = await bcrypt.compare(password, foundUser.password);
        console.log(match)
        if (match) {
            const accessToken = jwt.sign(
                { "username": foundUser.username, "role": foundUser.role_id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5h' }
            );
            const refreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            const updateRefreshTokenQuery = 'UPDATE users SET refreshToken = ? WHERE user_id = ?';
            const updateRefreshTokenParams = [refreshToken, foundUser.user_id];
            await database.promise().query(updateRefreshTokenQuery, updateRefreshTokenParams);

            res.json({ accessToken, refreshToken });
        } else {
            res.sendStatus(UNAUTHORIZED);
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleLogin };

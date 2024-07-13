const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const database = require('../config/db.config');

const handleNewUser = async (req, res) => {
    const { username, password, role, firstName, lastName, typeDni, dni, birth, email, phone } = req.body;

    if (!username || !password || !firstName || !lastName || !typeDni || !dni || !birth || !email || !phone) {
        return res.status(400).json({ 'message': 'All fields are required.' });
    }

    const duplicateUserQuery = 'SELECT * FROM users WHERE username = ?';
    const duplicatePersonQuery = 'SELECT * FROM people WHERE dni = ?';
    const insertUserQuery = 'INSERT INTO users (user_id, username, password, role_id, created, lastModified) VALUES (?, ?, ?, ?, ?, ?)';
    const insertPersonQuery = 'INSERT INTO people (firstName, lastName, typeDni, dni, birth, email, phone, created, lastModified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const [duplicateUserRows] = await database.promise().query(duplicateUserQuery, [username]);
        if (duplicateUserRows.length > 0) return res.sendStatus(409); // Conflict: Username already exists

        const [duplicatePersonRows] = await database.promise().query(duplicatePersonQuery, [dni]);
        if (duplicatePersonRows.length > 0) return res.sendStatus(409); // Conflict: DNI already exists

        const hashedPwd = await bcrypt.hash(password, 10);
        const currentDate = new Date();

        // Generate UUID for user_id
        const userId = uuidv4();

        // Insert into users table
        const newUserValues = [userId, username, hashedPwd, role, currentDate, currentDate];
        await database.promise().query(insertUserQuery, newUserValues);

        // Insert into people table
        const newPersonValues = [firstName, lastName, typeDni, dni, birth, email, phone, currentDate, currentDate];
        await database.promise().query(insertPersonQuery, newPersonValues);

        res.status(201).json({ 'success': `New user ${username} and person ${firstName} ${lastName} created!` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = { handleNewUser };

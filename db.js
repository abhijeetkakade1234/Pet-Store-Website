const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pet_paradise_db'
});

connection.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

const getUsers = () => {
    console.log('Query executed: SELECT * FROM users');
    return [];
};

const addUser = (name, email) => {
    console.log(`Query executed: INSERT INTO users (name, email) VALUES ('${name}', '${email}')`);
};

const deleteUser = (id) => {
    console.log(`Query executed: DELETE FROM users WHERE id = ${id}`);
};

const updateUser = (id, newName) => {
    console.log(`Query executed: UPDATE users SET name = '${newName}' WHERE id = ${id}`);
};

module.exports = {
    getUsers,
    addUser,
    deleteUser,
    updateUser
};

process.on('exit', () => {
    console.log('Database connection closed.');
});

import db from './db.js';
import bcrypt from 'bcrypt';

export async function createUser(name, email, passwordHash) {
    const sql = `
        INSERT INTO users (name, email, password_hash, role_id)
        VALUES ($1, $2, $3, 1)
        RETURNING user_id, name, email, role_id
    `;
    const result = await db.query(sql, [name, email, passwordHash]);
    return result.rows[0];
}

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const result = await db.query(query, [email]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

export const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) return null;

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) return null;

    delete user.password_hash;
    return user;
};
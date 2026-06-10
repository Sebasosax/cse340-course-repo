import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUsers } from '../models/users.js';

const saltRounds = 10;

export async function showUserRegistrationForm(req, res) {
    res.render('register', { title: 'Register' });
}

export async function processUserRegistrationForm(req, res) {
    const { name, email, password } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, saltRounds);
        await createUser(name, email, passwordHash);
        req.flash('success', 'Account created successfully. Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Registration error:', error);
        req.flash('error', 'Registration failed. The email may already be in use.');
        res.redirect('/register');
    }
}

export async function showLoginForm(req, res) {
    res.render('login', { title: 'Login' });
}

export async function processLoginForm(req, res) {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user = user;
            req.flash('success', 'Login successful. Welcome back!');
            console.log('Logged in user:', user);
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Login failed. Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'An error occurred during login.');
        res.redirect('/login');
    }
}

export async function processLogout(req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

export function requireLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
}

export async function showDashboard(req, res) {
    const { name, email } = req.session.user;
    const { getVolunteerProjects } = await import('../models/volunteers.js');
    const volunteerProjects = await getVolunteerProjects(req.session.user.user_id);
    res.render('dashboard', { title: 'Dashboard', name, email, volunteerProjects });
}

export function requireRole(role) {
    return function (req, res, next) {
        if (req.session.user && req.session.user.role_name === role) {
            return next();
        }
        req.flash('error', 'You do not have permission to access that page.');
        res.redirect('/');
    };
}

export async function showUsersPage(req, res) {
    const users = await getAllUsers();
    res.render('users', { title: 'Users', users });
}
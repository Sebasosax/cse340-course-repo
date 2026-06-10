import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

export async function processAddVolunteer(req, res) {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;
    try {
        await addVolunteer(userId, projectId);
        req.flash('success', 'You have signed up to volunteer for this project!');
    } catch (error) {
        console.error('Error adding volunteer:', error);
        req.flash('error', 'Could not sign up for this project.');
    }
    res.redirect(`/project/${projectId}`);
}

export async function processRemoveVolunteer(req, res) {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;
    try {
        await removeVolunteer(userId, projectId);
        req.flash('success', 'You have been removed as a volunteer.');
    } catch (error) {
        console.error('Error removing volunteer:', error);
        req.flash('error', 'Could not remove you from this project.');
    }
    res.redirect(req.headers.referer || '/dashboard');
}
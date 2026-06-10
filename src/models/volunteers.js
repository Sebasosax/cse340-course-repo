import db from './db.js';

export async function addVolunteer(userId, projectId) {
    const sql = `
        INSERT INTO public.project_volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
    `;
    await db.query(sql, [userId, projectId]);
}

export async function removeVolunteer(userId, projectId) {
    const sql = `
        DELETE FROM public.project_volunteer
        WHERE user_id = $1 AND project_id = $2
    `;
    await db.query(sql, [userId, projectId]);
}

export async function isVolunteer(userId, projectId) {
    const sql = `
        SELECT 1 FROM public.project_volunteer
        WHERE user_id = $1 AND project_id = $2
    `;
    const result = await db.query(sql, [userId, projectId]);
    return result.rows.length > 0;
}

export async function getVolunteerProjects(userId) {
    const sql = `
        SELECT p.project_id, p.title, p.description, p.location, p.date,
               o.name AS organization_name
        FROM public.project_volunteer pv
        JOIN public.service_project p ON pv.project_id = p.project_id
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY p.date ASC
    `;
    const result = await db.query(sql, [userId]);
    return result.rows;
}
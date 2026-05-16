import db from './db.js'

console.log('projects.js loaded');

const getAllProjects = async() => {
    console.log('getAllProjects called');
    const query = `
        SELECT p.project_id, p.title, p.description, p.location, p.date,
               o.name AS organization_name
        FROM public.service_project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        ORDER BY p.date;
    `;

    const result = await db.query(query);
    return result.rows;
}

export { getAllProjects }
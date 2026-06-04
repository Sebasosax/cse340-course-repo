// Import any needed model functions
import { getAllCategories, getCategoryById, getProjectsByCategory, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';

// Define controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategory(categoryId);
    const title = category.name;

    res.render('category', { title, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const project = await getProjectDetails(projectId);
    const allCategories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, project, allCategories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const categoryIds = req.body.categoryIds || [];

    // Ensure categoryIds is always an array
    const categoryIdsArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully!');
    res.redirect(`/project/${projectId}`);
};

// Export controller functions
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };
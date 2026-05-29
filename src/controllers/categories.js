// Import any needed model functions
import { getAllCategories, getCategoryById, getProjectsByCategory } from '../models/categories.js';

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

// Export controller functions
export { showCategoriesPage, showCategoryDetailsPage };
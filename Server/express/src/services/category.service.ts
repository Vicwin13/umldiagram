import { BadRequestError, NotFoundError } from '../errors/errors';
import { Category, ICategory } from './../models/category.model';

class CategoryService {
    async getAllCategories(userId: string): Promise<ICategory[]> {
        return await Category.find({ userId });
    }

    async getCategoryById(id: string, userId: string): Promise<ICategory> {
        const category = await Category.findOne({ _id: id, userId });
        if (!category) {
            throw new NotFoundError(`Category not found`);
        }
        return category;
    }

    async createCategory(categoryData: Partial<ICategory>, userId: string): Promise<ICategory> {
        const categoryWithUserId = { ...categoryData, userId };

        const existingCategory = await Category.findOne({ name: categoryData.name, userId });
        if (existingCategory) {
            throw new BadRequestError(`Category with name ${categoryData.name} already exists`);
        }
        return await Category.create(categoryWithUserId);
    }

    async updateCategory(id: string, updatedData: Partial<ICategory>, userId: string): Promise<ICategory> {
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id, userId },
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            throw new NotFoundError(`Category not found`);
        }
        return updatedCategory;
    }

    async deleteCategory(id: string, userId: string): Promise<ICategory> {
        const deletedCategory = await Category.findOneAndDelete({ _id: id, userId });
        if (!deletedCategory) {
            throw new NotFoundError(`Category not found`);
        }
        return deletedCategory;
    }
}

export default new CategoryService();

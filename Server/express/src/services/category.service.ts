import { BadRequestError, NotFoundError } from '../errors/errors';
import { Category, ICategory } from './../models/category.model';

class CategoryService {
    async getAllCategories(): Promise<ICategory[]> {
        return await Category.find({});
    }

    async getCategoryById(id: string): Promise<ICategory> {
        const category = await Category.findById(id);
        if (!category) {
            throw new NotFoundError(`Category with ID ${id} was not found`);
        }
        return category;
    }

    async createCategory(categoryData: Partial<ICategory>): Promise<ICategory> {
         const existingCategory = await Category.findOne({ name: categoryData.name });
        if (existingCategory) {
            throw new BadRequestError (`Category with name ${categoryData.name} already exists`);
        }
        return await Category.create(categoryData);
    }

    async updateCategory(id: string, updatedData: Partial<ICategory>): Promise<ICategory> {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updatedData,
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedCategory) {
            throw new NotFoundError(`Category with ID ${id} was not found`);
        }
        return updatedCategory;
    }

    async deleteCategory(id: string): Promise<ICategory> {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new NotFoundError(`Category with ID ${id} was not found`);
        }
        return deletedCategory;
    }
}

export default new CategoryService();

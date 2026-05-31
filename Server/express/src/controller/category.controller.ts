import { NextFunction, Request, Response } from "express";

import CategoryService from "../services/category.service";

class CategoryController {
    async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = String(req.params.id);
            const category = await CategoryService.getCategoryById(categoryId);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    }

    async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newCategory = await CategoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (err) {
            next(err);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = String(req.params.id);
            const updatedCategory = await CategoryService.updateCategory(categoryId, req.body);
            res.status(200).json(updatedCategory);
        } catch (err) {
            next(err);
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = String(req.params.id);
            await CategoryService.deleteCategory(categoryId);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }
}

export default new CategoryController();

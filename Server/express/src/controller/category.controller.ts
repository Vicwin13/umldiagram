import { NextFunction, Request, Response } from "express";

import CategoryService from "../services/category.service";

class CategoryController {
    async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = String(req.user?.id);
            const categories = await CategoryService.getAllCategories(userId);
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = String(req.params.id);
            const userId = String(req.user?.id);
            const category = await CategoryService.getCategoryById(categoryId, userId);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    }

    async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = String(req.user?.id);
            const newCategory = await CategoryService.createCategory(req.body, userId);
            res.status(201).json(newCategory);
        } catch (err) {
            next(err);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = String(req.params.id);
            const userId = String(req.user?.id);
            const updatedCategory = await CategoryService.updateCategory(categoryId, req.body, userId);
            res.status(200).json(updatedCategory);
        } catch (err) {
            next(err);
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = String(req.params.id);
            const userId = String(req.user?.id);
            await CategoryService.deleteCategory(categoryId, userId);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }
}

export default new CategoryController();

import CategoryController from "../controller/category.controller";
import { ICategory } from "../models/category.model";
import { Router } from "express";
import { validateRequestBody } from "../middleware/validate.middleware";

const router = Router();

type CategoryPayload = Pick<ICategory, 'name'>;


router.get('/', CategoryController.getCategories);
router.post('/', validateRequestBody<CategoryPayload>(['name']), CategoryController.createCategory);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', validateRequestBody<CategoryPayload>(['name']), CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;

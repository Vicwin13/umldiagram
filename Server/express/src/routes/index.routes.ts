import { Router } from "express";
import { authenticate } from './../middleware/auth.middleware';
import categoryRoutes from "./category.routes";
import noteRoutes from "./note.routes";

const masterRouter = Router();

masterRouter.use("/notes", authenticate, noteRoutes);
masterRouter.use("/categories", authenticate, categoryRoutes);

export default masterRouter;

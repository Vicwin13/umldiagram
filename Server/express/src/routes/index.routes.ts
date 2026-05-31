import { Router } from "express";
import categoryRoutes from "./category.routes";
import noteRoutes from "./note.routes";

const masterRouter = Router();

masterRouter.use("/notes", noteRoutes);
masterRouter.use("/categories", categoryRoutes);

export default masterRouter;

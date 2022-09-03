import { Router } from "express";
import createCardRouter from "./createCardRouter";

const router = Router();
router.use(createCardRouter);

export default router;
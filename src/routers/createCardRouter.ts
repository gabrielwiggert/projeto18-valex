import { Router } from "express";
import { createCard } from "../controllers/createCardController";
import validateSession from "../middlewares/validateSession";

const createCardRouter = Router();

createCardRouter.post("/createCard", validateSession, createCard);

export default createCardRouter;

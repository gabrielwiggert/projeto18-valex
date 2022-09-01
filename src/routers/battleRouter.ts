import { Router } from "express";
import { battle, getRanking } from "../controllers/battleController";

const battleRouter = Router();

battleRouter.post("/battle", battle);
battleRouter.get("/ranking", getRanking);

export default battleRouter;

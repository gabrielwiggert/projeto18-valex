import { Request, Response } from "express";
import * as createCardService from "../services/createCardService";

export async function createCard(req: Request, res: Response) {
  const { body }  = req.body;

  if (body) {
    return res.sendStatus(422);
  }

  const battleResult = await createCardService.createCard();
  res.send(battleResult);
}
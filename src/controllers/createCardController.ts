import { Request, Response } from "express";
import * as createCardService from "../services/createCardService";

export async function createCard(req: Request, res: Response) {
  const { idEmployee, cardType }  = req.body;

  try {
    await createCardService.createCard(idEmployee, cardType);
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }

  return res.sendStatus(201);
}
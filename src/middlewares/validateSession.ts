import { findByApiKey } from '../repositories/companyRepository';
import { NextFunction, Request, Response } from "express";

async function validateSession(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const session = await findByApiKey(authorization);

  if (!session.apiKey) {
    return res.sendStatus(401);
  }

  res.locals.session = session;

  next();
}

export default validateSession;

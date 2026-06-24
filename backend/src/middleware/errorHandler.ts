import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/errors";
import { logger } from "../lib/logger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof AppError) {
    if (!err.expose) {
      logger.error(err.message, err.stack);
    }
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  logger.error("Unexpected error", err.stack);
  res.status(500).json({ error: "Something went wrong." });
}
import { NextFunction, Response, Request } from "express";
import { SysErrors } from "./error.handler";

export const ErrorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof SysErrors) {
    res.status(error.statusCode).json({msg: error.message})
    return
  }

  res.status(500).json({msg: "Error interno del servidor"})
}

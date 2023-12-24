import { NextFunction, Request, Response } from "express";

const ErrorMiddleware = (error: Error, _: Request, response: Response, __: NextFunction) => response.status(500).json({ error: error.message });

export default ErrorMiddleware;
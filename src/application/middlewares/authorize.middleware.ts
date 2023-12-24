import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Token from "../../domain/authentication/token.interface";

const Authorize = async (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;

  if (!token) 
    return response.status(403).send({ error: "Access Denied." });

  jwt.verify(token.split(' ')[1] || '', process.env.JWT_KEY || "secret",
    (error, result) => {
      if (error) {
        console.error(error)
        return response.status(401).send({ error: `Invalid token.` });
      }
        
      request.token = result as Token;

      next();
    }
  );
};

export default Authorize;
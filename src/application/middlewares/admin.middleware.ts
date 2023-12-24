import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Token from "../../domain/authentication/token.interface";
import { Role } from "../../domain/definitions/account.interface";

const IsAdmin = async (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;

  if (!token)
    return response.status(403).send({ error: "Access Denied." });

  jwt.verify(token.split(' ')[1] || '', process.env.JWT_KEY || "secret",
    (error, result) => {
      if (error) {
        console.error("Error on verify token.", error);
        return response.status(401).send({ error: `Invalid token.` });
      }

      const token = result as Token;

      if (token.role !== Role.ADMIN) {
        console.info(`Access Denied. For: ${token.email} - Role: ${token.role}`);
        return response.status(403).send({ error: "Access Denied." });
      }

      next();
    }
  );
};

export default IsAdmin;
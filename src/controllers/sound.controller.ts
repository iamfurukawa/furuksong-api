import { NextFunction, Request, Response } from "express";

class SoundController {
    async index(request: Request, response: Response, next: NextFunction) { }
    async create(request: Request, response: Response, next: NextFunction) { }
    async evaluate(request: Request, response: Response, next: NextFunction) { }
    async update(request: Request, response: Response, next: NextFunction) { }
    async delete(request: Request, response: Response, next: NextFunction) { }
}

export default new SoundController();
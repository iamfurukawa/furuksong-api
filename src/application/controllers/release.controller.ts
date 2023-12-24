import { NextFunction, Request, Response } from "express";

import ReleaseService from "../../domain/release/release.service";

class ReleaseController {

    async index(request: Request, response: Response, nextFunction: NextFunction) {
        let { lasts } = request.params
        try {
            const releases = await ReleaseService.find(parseInt(lasts));
            response.json(releases);
        } catch (error) {
            nextFunction(error);
        }
    }

    async create(request: Request, response: Response, nextFunction: NextFunction) {
        const { requests } = request.body;
        try {
            await ReleaseService.create(requests);
            response.status(204).send();
        } catch (error) {
            nextFunction(error);
        }
    }
}

export default new ReleaseController();
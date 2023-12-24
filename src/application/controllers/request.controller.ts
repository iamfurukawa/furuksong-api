import { NextFunction, Request, Response } from "express";

import RequestService from "../../domain/request/request.service";

class RequestController {

    async index(request: Request, response: Response, nextFunction: NextFunction) {
        const onlyMyRequests = request.query.my?.toString().toLowerCase() == 'true';
        const token = request.token!;
        try {
            const requests = await RequestService.retrieveAll(onlyMyRequests, token);
            if(requests.length === 0) {
                response.status(404).send();
                return;
            }

            response.json(requests);
        } catch (error) {
            nextFunction(error);
        }
    }

    async create(request: Request, response: Response, nextFunction: NextFunction) {
        const token = request.token!;
        try {
            RequestService.create({
                ...request.body,
                ownerId: token.uuid
            });
            response.status(204).send();
        } catch (error) {
            nextFunction(error);
        }
    }

    async delete(request: Request, response: Response, nextFunction: NextFunction) {
        let { id } = request.params;
        let { token } = request;

        try {
            RequestService.delete(token?.uuid!, id);
            response.status(204).send();
        } catch (error) {
            nextFunction(error);
        }
    }
}

export default new RequestController();
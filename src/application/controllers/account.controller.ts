import { NextFunction, Request, Response } from "express";
import AccountService from "../../domain/account/account.service";

class AccountController {

    async create(request: Request, response: Response, nextFunction: NextFunction) {
        const {
            email,
            password,
            username
        } = request.body;

        try {
            await AccountService.register(email, password, username);
            response.status(204).send();
        } catch (error) {
            nextFunction(error);
        }
    }

    async update(request: Request, response: Response, nextFunction: NextFunction) {
        const token = request.token!;
        const { username } = request.body;

        try {
            await AccountService.updateUsername(token.uuid, username);
            response.status(204).send();
        } catch (error) {
            nextFunction(error);
        }
    }

    async delete(request: Request, response: Response, nextFunction: NextFunction) {
        const token = request.token!;

        try {
            await AccountService.inactivateBy(token.uuid);
            response.status(204).send();
        } catch (error) {
            nextFunction(error);
        }
    }

    async reset(request: Request, response: Response, nextFunction: NextFunction) {
        const {
            email,
            oldPassword,
            newPassword
        } = request.body;

        try {
            await AccountService.resetPassword(email, oldPassword, newPassword);
            response.status(204).send();
        } catch (error) {
            nextFunction(error);
        }
    }

    async changeRole(request: Request, response: Response, nextFunction: NextFunction) {
        const { role } = request.body;
        const accountId = request.params.id;

        try {
            await AccountService.updateRole(accountId, role);
            response.status(204).send();
        } catch (error) {
            nextFunction(error);
        }
    }
}

export default new AccountController();
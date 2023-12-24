import { Request, Response } from "express";

import AuthenticationService from "../../domain/authentication/authentication.service";

class AuthenticationController {

    async signIn(request: Request, response: Response) {
        const { email, password } = request.body;

        try {
            const token = await AuthenticationService.authenticate(email, password);
            response.json({ token });
        } catch (error) {
            console.error(error);
            response.status(401).send();
        }
    }
}

export default new AuthenticationController();
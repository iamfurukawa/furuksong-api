import { NextFunction, Request, Response } from "express";
import SoundService from "../../domain/sound/sound.service";
import { Role } from "../../domain/definitions/account.interface";
import { Sound } from "../../domain/definitions/sound.interface";

class SoundController {
    async index(request: Request, response: Response, nextFunction: NextFunction) {
        const token = request.token!;

        try {
            const soundsActives = await SoundService.retrieveAllActive();
            
            let soundsInactives: Sound[] = [];
            if (token.role == Role.ADMIN)
                soundsInactives = await SoundService.retrieveAllInactive();

            response.json({actives: soundsActives, inactives: soundsInactives});
        } catch (error) {
            nextFunction(error);
        }
    }
}

export default new SoundController();
import { Request, Response } from "express";

import AudioPlayerService from "../../domain/audio-player/audio-player.service";

class AudioPlayerController {
    async play(request: Request, response: Response) {
        const soundId = request.params.sound;
        const userId = request.headers.user as string;

        AudioPlayerService.play(soundId, userId);
        response.status(204).send();
    }
}

export default new AudioPlayerController();
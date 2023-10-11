import { Request, Response } from "express";

import DiscordClient from '../discord/client';

import StorageService from '../firebase/storage'
import VoiceManager from '../discord/voice-manager';

class AudioPlayerController {
    async play(request: Request, response: Response) {
        const soundId = request.params.sound;
        const userId = request.headers.user as string;

        const channel = await DiscordClient.ChannelService.findChannelByUserBy(userId);
        const audioUrl = await StorageService.getFileURLBy(soundId);

        VoiceManager.play(audioUrl, channel);

        response.status(204).send();
    }
}

export default new AudioPlayerController();
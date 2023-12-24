import VoiceManager from "./voice-manager";
import DiscordClient from './client';

class PlayerService {
    async play(audioUrl: string, userId: string) {
        const channel = await DiscordClient.ChannelService.findChannelByUserBy(userId);
        VoiceManager.play(audioUrl, channel);
    }
}

export default new PlayerService();
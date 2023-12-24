import PlayerService from "../../infrastructrure/bot/discord/player.service";
import SoundRepository from "../../infrastructrure/database/sound";

class AudioPlayerService {

    async play(soundId: string, userId: string) {
        console.log(`class=AudioPlayerService m=play stage=init soundId=${soundId} userId=${userId}`);
        try {
            const sound = await SoundRepository.findOneBy(soundId);
            if (!sound) {
                console.log(`Sound ${soundId} not found`);
                throw new Error('Sound not found');
            }

            PlayerService.play(sound.url, userId);
            console.log(`class=AudioPlayerService m=play stage=end`);
        } catch (error) {
            console.error(`class=AudioPlayerService m=play stage=error error=${error}`);
        }
    }
}

export default new AudioPlayerService();
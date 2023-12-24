import SoundRepository from "../../infrastructrure/database/sound";
import { Sound } from "../definitions/sound.interface";

class SoundService {

    async retrieveAllActive(): Promise<Sound[]> {
        console.log(`class=SoundService m=retrieveAllActive stage=init`);
        try {
            const soundsActives = await SoundRepository.findAllActives();
            console.log(`class=SoundService m=retrieveAllActive stage=end`);
            return soundsActives;
        } catch (error) {
            console.error(`class=SoundService m=retrieveAllInactive stage=error error=${error}`);
            throw error;
        }
    }

    async retrieveAllInactive(): Promise<Sound[]> {
        console.log(`class=SoundService m=retrieveAllInactive stage=init`);
        try {
            const soundsInactives = await SoundRepository.findAllInactive();
            console.log(`class=SoundService m=retrieveAllInactive stage=end`);
            return soundsInactives;
        } catch (error) {
            console.error(`class=SoundService m=retrieveAllInactive stage=error error=${error}`);
            throw error;
        }
    }
}

export default new SoundService();
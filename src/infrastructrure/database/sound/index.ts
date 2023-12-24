import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import SoundRepositoryBase, { Sound } from "../../../domain/definitions/sound.interface";
import FirebaseConfig from "../../configurations/firebase.config";

class SoundRepository implements SoundRepositoryBase {

    private TABLE_NAME = "songs";

    async findAll(): Promise<Sound[]> {
        const sounds = await getDocs(collection(FirebaseConfig.Database(), this.TABLE_NAME));
        return sounds.docs.map((sound) => {
            return { ...sound.data() as Sound, uuid: sound.id } satisfies Sound;
        })
    }

    async findAllActives(): Promise<Sound[]> {
        return await this.findAllByHidden(false);
    }

    async findAllInactive(): Promise<Sound[]> {
        return await this.findAllByHidden(true);
    }

    private async findAllByHidden(isActive: boolean): Promise<Sound[]> {
        const sounds = await getDocs(collection(FirebaseConfig.Database(), this.TABLE_NAME));
        return sounds.docs
            .filter((sound) => sound.data().hidden === isActive)
            .map((sound) => {
                return { ...sound.data() as Sound, uuid: sound.id } satisfies Sound;
            })
    }

    async findOneBy(id: string): Promise<Sound | null> {
        const soundRef = doc(collection(FirebaseConfig.Database(), this.TABLE_NAME), id);
        const sound = await getDoc(soundRef);

        if (sound.exists()) {
            const soundData = sound.data();
            return { ...soundData as Sound, uuid: soundData.id } satisfies Sound;
        }

        return null;
    }

    async save(sound: Sound, id: string): Promise<void> {
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id), sound, { merge: true });
    }

    async update(sound: Sound, uuid: string): Promise<void> {
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, uuid), sound, { merge: true });
    }

    async deleteBy(uuid: string): Promise<void> {
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, uuid),
            { hidden: true },
            { merge: true });
    }
}

export default new SoundRepository();
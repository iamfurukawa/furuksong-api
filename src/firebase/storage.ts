import app from './app';
import { 
    FirebaseStorage, 
    getStorage, 
    ref, 
    getDownloadURL 
} from "firebase/storage";

class StorageService {

    storage: FirebaseStorage;

    constructor() {
        this.storage = getStorage(app);
    }

    async getFileURLBy(fileName: string): Promise<string> {
        const fileRef = ref(this.storage, fileName);

        try {
            return await getDownloadURL(fileRef);
        } catch (error) {
            throw new Error('Error on finding audio');
        }
    }
}

export default new StorageService();
import { getDownloadURL, ref } from "firebase/storage";
import StorageBase from "../../domain/definitions/storage.interface";
import FirebaseConfig from "../configurations/firebase.config";

class StorageService implements StorageBase {

    async getFileURLBy(fileName: string): Promise<string> {
        const fileRef = ref(FirebaseConfig.Storage(), fileName);
        return await getDownloadURL(fileRef);
    }
}

export default new StorageService();
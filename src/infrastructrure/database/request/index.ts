import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import RequestRepositoryBase, { Request } from "../../../domain/definitions/request.interface";
import FirebaseConfig from "../../configurations/firebase.config";
import { v4 as uuid } from 'uuid';

class RequestRepository implements RequestRepositoryBase {

    private TABLE_NAME = "requests";

    async findAll(): Promise<Request[]> {
        const requests = await getDocs(collection(FirebaseConfig.Database(), this.TABLE_NAME));
        return requests.docs.map((request) => {
            return { ...request.data() as Request, uuid: request.id } satisfies Request;
        })
    }

    async findMyRequestsBy(ownerId: string): Promise<Request[]> {
        const requestsFilter = query(collection(FirebaseConfig.Database(), this.TABLE_NAME),
            where("ownerId", "==", ownerId));

        const requestsFounded = await getDocs(requestsFilter);

        const requests = requestsFounded.docs.map(request => {
            const requestData = request.data();

            return {
                uuid: request.id,
                soundId: requestData.id,
                name: requestData.name,
                tags: requestData.tags,
                url: requestData.url,
                type: requestData.type,
                comment: requestData.comment,
                ownerId: requestData.ownerId
            } satisfies Request;
        })

        return requests;
    }

    async findOneBy(id: string): Promise<Request | null> {
        const requestRef = doc(collection(FirebaseConfig.Database(), this.TABLE_NAME), id);
        const request = await getDoc(requestRef);

        if (request.exists()) {
            const requestData = request.data();
            return { 
                ...requestData as Request, 
                uuid: request.id,
            } satisfies Request;
        }

        return null;
    }

    async save(request: Request): Promise<void> {
        let id = uuid();
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id), request, { merge: true });
    }

    async deleteBy(id: string): Promise<void> {
        await deleteDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id));
    }

}

export default new RequestRepository();
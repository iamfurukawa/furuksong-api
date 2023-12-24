import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

import FirebaseConfig from "../../configurations/firebase.config";
import QuoteRepositoryBase, { Quote } from "../../../domain/definitions/quote.interface";

import { v4 as uuid } from 'uuid';

class QuoteRepository implements QuoteRepositoryBase {
    
    private TABLE_NAME = "quotes";

    async save(quote: Quote): Promise<void> {
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, uuid()), quote, { merge: true });
    }

    async retrieveAll(): Promise<Quote[]> {
        const quotes = await getDocs(collection(FirebaseConfig.Database(), this.TABLE_NAME));
        return quotes.docs.map((quote) => {
            return { ...quote.data() as Quote, uuid: quote.id } satisfies Quote;
        })
    }

    async deleteBy(id: string): Promise<void> {
        await deleteDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id));
    }   
}

export default new QuoteRepository();
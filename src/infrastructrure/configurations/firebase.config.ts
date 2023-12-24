import { FirebaseApp, initializeApp } from "firebase/app";

import { FirebaseStorage, getStorage } from "firebase/storage";
import { Firestore, getFirestore } from "firebase/firestore";

class FirebaseConfig {

    private app: FirebaseApp;

    private storage: FirebaseStorage;

    private database: Firestore;

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyAIzwheovszYOCgKQeFbWAjyNzk4t-jS28",
            authDomain: "furuksong.firebaseapp.com",
            databaseURL: "https://furuksong-default-rtdb.firebaseio.com",
            projectId: "furuksong",
            storageBucket: "furuksong.appspot.com",
            messagingSenderId: "511657412828",
            appId: "1:511657412828:web:e82110995aff6804414c19"
        };

        this.app = initializeApp(firebaseConfig);
        this.storage = getStorage(this.app);
        this.database = getFirestore(this.app);
    }

    Storage() {
        return this.storage;
    }

    Database() {
        return this.database;
    }
}

export default new FirebaseConfig();
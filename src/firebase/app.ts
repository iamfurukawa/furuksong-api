import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIzwheovszYOCgKQeFbWAjyNzk4t-jS28",
  authDomain: "furuksong.firebaseapp.com",
  databaseURL: "https://furuksong-default-rtdb.firebaseio.com",
  projectId: "furuksong",
  storageBucket: "furuksong.appspot.com",
  messagingSenderId: "511657412828",
  appId: "1:511657412828:web:e82110995aff6804414c19"
};

const app = initializeApp(firebaseConfig);

export default app;
import * as firebase from 'firebase';
import '@firebase/firestore';
import {FIREBASE_KEY} from '../key';

const config = {
    apiKey: {FIREBASE_KEY},
    authDomain: "react-spa-ea178.firebaseapp.com",
    databaseURL: "https://react-spa-ea178.firebaseio.com",
    projectId: "react-spa-ea178",
    storageBucket: "react-spa-ea178.appspot.com",
    messagingSenderId: "247084751253",
    appId: "1:247084751253:web:6cbb9a8551ce31aea43e9c",
    measurementId: "G-8VB5RM2QLK"
};

firebase.initializeApp(config);

export default firebase;
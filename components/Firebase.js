import * as firebase from 'firebase';
import '@firebase/firestore';
import {FIREBASE_KEY} from '../key';

const config = {
    apiKey: FIREBASE_KEY,
    authDomain: "greenpath-269612.firebaseapp.com",
    databaseURL: "https://greenpath-269612.firebaseio.com",
    projectId: "greenpath-269612",
    storageBucket: "greenpath-269612.appspot.com",
    messagingSenderId: "870337715085",
    appId: "1:870337715085:web:e6f61602923ee1ee61bbc4"
  };

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
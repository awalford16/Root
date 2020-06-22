import React from 'react';
import firebase from './Firebase'

export default function GetUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) return null;
        return user;
    })
}
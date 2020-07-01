import React from 'react';
import firebase from './Firebase'

export default function GetUser() {
    const user = firebase.auth().currentUser;

    if (!user) return null;
    return user;
}
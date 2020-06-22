import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import colours from '../components/Colours';
import {GOOGLE_AUTH_IOS} from '../key';
import logo_white from '../assets/logo_white.png';


export default class AuthScreen extends Component {

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.

                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken, googleUser.accessToken
                );

                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential)
                    .then(
                        function(result) {
                            firebase.firestore().collection('users').doc(result.user.uid)
                            .set({
                                gmail: result.user.email,
                                profile_image: result.additionalUserInfo.profile.picture,
                                username: result.additionalUserInfo.profile.name
                            })
                            .catch((error) => {console.log(error)})
                        }
                    )
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...

                        console.log(errorMessage);
                        console.log(credential);
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
                // We don't need to reauth the Firebase connection.
                return true;
            }
            }
        }
        return false;
    }

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                // androidClientId: GOOGLE_AUTH_IOS,
                iosClientId: GOOGLE_AUTH_IOS,
                scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    render() {
        return(
            <Container>
                <Logo source={logo_white} />

                <AuthOptions>
                    <AuthButton onPress={() => this.signInWithGoogleAsync()}>
                        <FontAwesome name='google' size={25} color={colours.white} />
                        <ButtonText>Sign In with Google</ButtonText>
                    </AuthButton>

                    <AuthButton onPress={() => console.log('hello')} style={{backgroundColor: colours.darkblue}}>
                        <FontAwesome name='facebook' size={25} color={colours.white} />
                        <ButtonText>Sign In with Facebook</ButtonText>
                    </AuthButton>
                </AuthOptions>
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
    background-color: ${colours.green};
    align-items: center;
    justify-content: space-evenly;
`;

const Logo = styled.Image`
    width: 50%;
    height: 15%;
    resize-mode: contain;
`;

const AuthOptions = styled.View`
    width: 80%;
`;

const AuthButton = styled.TouchableOpacity`
    flex-direction: row;
    background: ${colours.red};
    padding: 15px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    margin-top: 15px;
`;

const ButtonText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
    color: ${colours.white}
`;
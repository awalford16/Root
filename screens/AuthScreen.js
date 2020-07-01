import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';

import colours from '../components/Colours';
import {GOOGLE_AUTH_IOS, FACEBOOK_AUTH_ID} from '../key';
import logo_white from '../assets/logo_white.png';
import GetUser from '../components/GetUser';

export default class AuthScreen extends Component {

    //#region Google Sign In
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
                            if (result.additionalUserInfo.isNewUser) {
                                firebase.firestore().collection('users').doc(result.user.uid)
                                .set({
                                    gmail: result.user.email,
                                    profile_image: result.additionalUserInfo.profile.picture,
                                    username: result.additionalUserInfo.profile.name,
                                    created_at: Date.now(),
                                    points: 0,
                                    c02: 0
                                }).then(() => this.sendEmailVerification())
                                .catch((error) => {console.log(error)})
                            } else {
                                firebase.firestore().collection('users').doc(result.user.uid).update({
                                    last_logged_in: Date.now()
                                })
                            }
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
    //#endregion

    //#region Facebook Sign In
    async loginWithFacebook() {
        await Facebook.initializeAsync(FACEBOOK_AUTH_ID, 'Root');

        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            FACEBOOK_AUTH_ID, {permissions: ['public_profile']}
        )

        switch(type) {
            case 'success': {
                const credential = firebase.auth().FacebookAuthProvider.credential(token);

                firebase.auth().signInWithCredential(credential).catch((error) => {
                    console.log(error);
                });

                return Promise.resolve({type: 'success'});
            }

            case 'cancel': {
                return Promise.reject({type: 'cancel'});
            }
        }
    }
    //#endregion

    // Send verfication email
    sendSignUpEmail() {
        const user = GetUser();
        user.sendEmailVerification().catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return(
            <Container>
                <Logo source={logo_white} />

                <Welcome>
                    <WelcomeMessage>
                        Improving the World, One Step at a Time...
                    </WelcomeMessage>
                </Welcome>

                <AuthOptions>
                    <LoginMessage>
                        Please Log In to begin tracking your journeys.
                    </LoginMessage>
                    <AuthButton onPress={() => this.signInWithGoogleAsync()}>
                        <FontAwesome name='google' size={25} color={colours.white} />
                        <ButtonText>Sign In with Google</ButtonText>
                    </AuthButton>

                    <AuthButton onPress={() => this.loginWithFacebook()} style={{backgroundColor: colours.darkblue}}>
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
    justify-content: center;
`;

const Logo = styled.Image`
    width: 50%;
    height: 15%;
    resize-mode: contain;
`;

const Welcome = styled.View`
    flex: 0.3;
`;

const WelcomeMessage = styled.Text`
    color: ${colours.unselected};
    font-size: 15px;
`;

const AuthOptions = styled.View`
    width: 80%;
    background-color: ${colours.white};
    padding: 10px;
    height: 270px;
    justify-content: flex-start;
    width: 100%;
    position: absolute;
    bottom: 0;
`;

const LoginMessage = styled.Text`
    align-self: center;
    padding: 5px;
    font-size: 12px;
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
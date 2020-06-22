import React, { Component } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';

import colours from '../components/Colours';
import logo_white from '../assets/logo_white.png';

export default class SplashScreen extends Component {

    componentDidMount() {
        this.checkUserLogin();
    }
    
    checkUserLogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Home');
            } else {
                this.props.navigation.navigate('Auth');
            }
        })
    }

    render() {
        return(
            <Container>
                <Logo source={logo_white} />
            </Container>
        )
    }
}

const Container = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${colours.green};
`;

const Logo = styled.Image`
    width: 70%;
    height: 15%;
    resize-mode: contain;
`;
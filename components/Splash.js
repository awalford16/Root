import React from 'react';
import styled from 'styled-components';

import logo_white from '../assets/logo_white.png';
import colours from './Colours';

export default function Splash() {
    return(
        <Container>
            <Logo source={logo_white} />
        </Container>
    )
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
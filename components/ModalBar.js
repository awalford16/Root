import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import colours from './Colours';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export default function ModalBar(props) {
    const navigation = useNavigation();
    return(
        <Container>
            <Icon onPress={() => props.hideModal(false)} color={colours.unselected} name="angle-down" size={40} style={{alignSelf: 'center'}} />
            <NavTabs>
                <Icon name="bar-chart-o" size={25} color={colours.unselected} />
                <Icon name="handshake-o" size={25} color={colours.white} />
                <Icon name="history" size={25} color={colours.unselected} />
            </NavTabs>
        </Container>
    );
}

const Container = styled.View`
    width: 100%;
`;

const NavTabs = styled.View`
    color: ${colours.white};
    align-self: center;
    flex-direction: row;
    width: 100%;
    padding: 10px;
    justify-content: space-evenly;
`;
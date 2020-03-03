import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import colours from './Colours';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export default function ModalBar() {
    const navigation = useNavigation();
    return(
        <Container>
            <Icon name="sort-down" size={25} color={colours.white} 
                style={{ alignSelf: 'center', position: 'absolute', top: 30, fontWeight: 50 }} 
                onPress={() => navigation.goBack()} />
            <Icon name="user-circle" size={32} color={colours.white} style={{ position:'absolute', left: 30, top: 60 }} />
            <NavTabs>
                <Icon name="list" size={25} color={colours.unselected} />
                <Icon name="list" size={25} color={colours.white} />
                <Icon name="list" size={25} color={colours.unselected} />
            </NavTabs>
        </Container>
    );
}

const Container = styled.View`
    background-color: ${colours.green};
    width: 100%;
    flex: 0.14;
    padding-top: 60px;
`;

const NavTabs = styled.View`
    color: ${colours.white};
    align-self: center;
    flex-direction: row;
    width: 100%;
    position: absolute;
    top: 115px;
    justify-content: space-evenly;
`;
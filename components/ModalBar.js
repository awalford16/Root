import React from 'react';
import styled from 'styled-components';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import colours from './Colours';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export default function ModalBar(props) {
    const navigation = useNavigation();
    return(
        <Container>
            <FontAwesome onPress={() => props.hideModal(false)} color={colours.unselected} name="angle-down" size={30} style={{alignSelf: 'center'}} />
            <NavTabs>
                <FontAwesome 
                    onPress={() => props.selectView(0)} 
                    name="bar-chart-o" size={22} color={props.openView == 0 ? colours.white : colours.unselected} />
                <FontAwesome 
                    onPress={() => props.selectView(1)} 
                    name="handshake-o" size={22} color={props.openView == 1 ? colours.white : colours.unselected} />
                <FontAwesome 
                    onPress={() => props.selectView(2)} 
                    name="history" size={22} color={props.openView == 2 ? colours.white : colours.unselected} />
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
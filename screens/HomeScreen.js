import React, { Component } from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import colours from '../components/Colours';
import TransportOptions from '../components/TransportOptions';
import { TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {

    render() {
        return (
            <Container>
                <Titlebar>
                    <Ionicons name="ios-person" size={32} color={colours.white} style={{ position:'absolute', left: 30, top: 60 }} />
                    <Title>Green Path</Title>
                    <Ionicons name="ios-leaf" size={32} color={colours.white} style={{ position:'absolute', right: 30, top: 60 }} />
                </Titlebar>

                <TransportOptions selected="car" />

                <TouchableOpacity style={{ position:'absolute', bottom: 20, left: 10 }}>
                    <DonateButton>
                        Donate{'   '}
                        <Icon name="globe" size={32} color={colours.green} />
                    </DonateButton>
                </TouchableOpacity>
            </Container>
        )
    }
}

const Container = styled.View`
    background-color: ${colours.background};
    flex: 1;
`;

const Titlebar = styled.View`
    background-color: ${colours.green};
    width: 100%;
    height: 120px;
    padding-top: 60px;
`;

const DonateButton = styled.Text`
    border: 2px solid ${colours.green};
    color: ${colours.green};
    border-radius: 35px;
    margin: 20px;
    font-weight: 600;
    font-size: 25px;
    padding: 20px;
    align-self: flex-start;
}`;

const Title = styled.Text`
    color: ${colours.white};
    font-weight: 600;
    font-size: 30px;
    text-align: center;
`;

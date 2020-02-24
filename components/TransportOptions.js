import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

import { transportList } from '../data/transport';
import colours from './Colours';
import { ScrollView } from 'react-native-gesture-handler';

export default class TransportOptions extends Component {
    render() {
        return(
            <Container>
                {
                    transportList.map((option, index) => {
                        <Ionicons name={option.icon} size={32} color={colours.green} />
                    })
                }
            </Container>
        )
    }
}

const Container = styled.View``;

const ButtonContainer = styled.View`
    background-color: 'black';
    border: 1px solid #000;
    border-radius: 50px;
    flex: 1;
`;
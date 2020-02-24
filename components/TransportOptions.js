import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

import { transportList } from '../data/transport';
import colours from './Colours';
import { NavigationEvents } from 'react-navigation';

export default class TransportOptions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                {
                    transportList.map((option, index) => (
                        <TrasnportContainer key={index}>
                            <Ionicons name={option.icon} size={40} color={option.title == this.props.selected ? colours.green : colours.grey} />
                        </TrasnportContainer>
                    ))
                }
            </Container>
        )
    }
}

const Container = styled.View`
    flex-direction: row;
    flex: 0.15;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${colours.background};
    margin-top: 20px;
`;


const TrasnportContainer = styled.TouchableOpacity`
    background-color: ${colours.background};
    width: 75px;
    height: 75px;
    align-items: center;
`;
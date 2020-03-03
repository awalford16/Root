import React, { Component } from 'react';
import styled from 'styled-components';
import { TouchableOpacity, Modal, Keyboard } from 'react-native';

import colours from '../components/Colours';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalBar from '../components/ModalBar';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class DonateScreen extends Component {

    render() {
        return (
            <Container>
                <ModalBar />

                <DonateStats>
                    <Icon name="gbp" size={30} />
                    <DonateAmount value="1.00" keyboardType="numeric" maxLength={5} onSubmit={Keyboard.dismiss()} />
                    
                </DonateStats>

                <CharitySlider>
                    <CharityInfo>This is a charity.</CharityInfo>
                </CharitySlider>
                
            </Container>
        )
    }
}

const Container = styled.View`
    background-color: ${colours.background};
    flex: 1;
`;

const CharitySlider = styled.View`
    flex: 0.5;
    border: 2px solid ${colours.green};
    width: 90%;
    border-radius: 40px;
    padding: 8%;
    align-self: center;
    margin: 2%;
`;

const CharityInfo = styled.Text`
    font-size: 20px;
    font-weight: 700;
`;

const DonateStats = styled.View`
    flex: 0.18;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`;

const DonateAmount = styled.TextInput`
    font-weight: 600;
    font-size: 50px;
    margin: 5%;
`;
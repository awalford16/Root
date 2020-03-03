import React, { Component } from 'react';
import styled from 'styled-components';
import { TouchableOpacity, Modal, Keyboard } from 'react-native';

import colours from '../components/Colours';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalBar from '../components/ModalBar';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class DonateScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            donationAmount: "1.00"
        }
    }


    updateDonation = (amount) => {
        this.setState({
            donationAmount: amount
        });
    }

    render() {
        return (
            <Container>
                <ModalBar />

                <DonateStats>
                    <Icon name="gbp" size={20} />
                    <DonateAmount value={this.state.donationAmount} keyboardType="numeric" 
                      maxLength={5} 
                      onChangeText={this.updateDonation} />
                </DonateStats>

                <PointsRemaining>Points Remaining: 12</PointsRemaining>

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
    flex: 0.3;
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
    flex: 0.16;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`;

const DonateAmount = styled.TextInput`
    font-weight: 600;
    font-size: 50px;
    padding: 2%;
`;

const PointsRemaining = styled.Text`
    color: ${colours.grey};
    text-align: center;
    font-size: 18px;
    margin: 2%;
`;
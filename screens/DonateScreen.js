import React, { Component } from 'react';
import styled from 'styled-components';
import { Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';

import colours from '../components/Colours';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalBar from '../components/ModalBar';

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback style={{'flex': 1}} onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default class DonateScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            donationAmount: "1"
        }
    }

    updateDonation = (amount) => {
        this.setState({
            donationAmount: amount.replace(/[^0-9]/g, '')
        });
    }

    render() {
        return (
            <DismissKeyboard>
                <Container>
                    <ModalBar />

                    <DonateStats>
                        <Icon name="gbp" size={20} />
                        <DonateAmount ref="textInput" value={this.state.donationAmount} keyboardType="numeric" 
                        maxLength={3} 
                        onChangeText={value => this.updateDonation(value)} /> 
                        <Decimal>.00</Decimal>
                    </DonateStats>

                    <PointsRemaining>Points Remaining: 12</PointsRemaining>

                    <CharitySlider>
                        <CharityTitle>
                            <CharityLogo source={{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}} />
                            <Title>Charity Name</Title>
                        </CharityTitle>
                        
                        <CharityInfo>This is a charity.</CharityInfo>
                    </CharitySlider>

                    <SubmitDonation style={{position: 'absolute', bottom: 85}}>
                        <DonationText>Donate  £{this.state.donationAmount}</DonationText>
                    </SubmitDonation>
                    
                </Container>
            </DismissKeyboard>
        )
    }
}

const Container = styled.View`
    background-color: ${colours.background};
    flex: 1;
`;

const CharitySlider = styled.View`
    flex: 0.4;
    border: 2px solid ${colours.green};
    width: 90%;
    border-radius: 40px;
    padding: 8%;
    align-self: center;
    margin: 2%;
`;

const CharityTitle = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10%;
`;

const CharityLogo = styled.Image`
    width: 70px;
    height: 70px;
`;

const Title = styled.Text`
    font-size: 28px;
    font-weight: 700;
    margin: 3%;
    align-self: flex-end;
`;

const CharityInfo = styled.Text`
    font-size: 17px;
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
    text-align: center;
`;

const PointsRemaining = styled.Text`
    color: ${colours.grey};
    text-align: center;
    font-size: 18px;
    margin: 2%;
`;

const Decimal = styled.Text`
    font-size: 30px;
`;

const SubmitDonation = styled.TouchableOpacity`
    background-color: ${colours.green};
    align-self: center;
    border-radius: 50px;
    padding: 8%;
    align-items: center;
    height: 40px;
`;

const DonationText = styled.Text`
    color: ${colours.white};
    font-size: 30px;
`;

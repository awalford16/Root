import React, { Component } from 'react';
import styled from 'styled-components';
import { Keyboard, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

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
            <GestureRecognizer onSwipeDown={() => this.props.showModal(false)}>
                <Modal animationType="slide" transparent={true} visible={this.props.modalVisible}>
                    <DismissKeyboard>
                        <Container>
                            <ModalBar hideModal={this.props.showModal} />
                            <DonateStats>
                                <Icon name="gbp" size={20} color={colours.white} />
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

                            <SubmitDonation>
                                <DonationText>Donate  £{this.state.donationAmount}</DonationText>
                            </SubmitDonation>

                        </Container>
                    </DismissKeyboard>
                </Modal>
            </GestureRecognizer>
        )
    }
}

const Container = styled.View`
    background-color: ${colours.green};
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 420px;
    align-self: center;
`;

const CharitySlider = styled.View`
    flex: 0.4;
    border: 2px solid ${colours.white};
    background-color: ${colours.white};
    width: 95%;
    border-radius: 10px;
    padding: 8%;
    align-self: center;
    justify-content: center;
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
    font-size: 20px;
    font-weight: 700;
    margin: 3%;
    align-self: flex-end;
`;

const CharityInfo = styled.Text`
    font-size: 15px;
`;

const DonateStats = styled.View`
    flex: 0.3;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`;

const DonateAmount = styled.TextInput`
    color: ${colours.white};
    font-weight: 600;
    font-size: 40px;
    padding: 2%;
    text-align: center;
`;

const PointsRemaining = styled.Text`
    color: ${colours.unselected};
    text-align: center;
    font-size: 18px;
    margin: 2%;
`;

const Decimal = styled.Text`
    font-size: 20px;
    color: ${colours.white};
`;

const SubmitDonation = styled.TouchableOpacity`
    background-color: ${colours.white};
    align-self: flex-end;
    border-radius: 20px;
    padding: 15px;
    align-items: center;
    margin: 15px;
`;

const DonationText = styled.Text`
    color: ${colours.green};
    font-size: 20px;
`;

import React, { Component } from 'react';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import { FontAwesome } from '@expo/vector-icons';
import { Dimensions, Alert } from 'react-native';

import colours from '../components/Colours';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalBar from '../components/ModalBar';
import {charityList} from '../data/charities';
import firebase from '../components/Firebase';
import DonateConfirm from '../components/DonateConfirm';
import GetUser from '../components/GetUser';

export default class DonateScreen extends Component {
    constructor(props){
        super(props);

        this.userRef = firebase.firestore().collection('users').doc(GetUser().uid);
        this.donateRef = this.userRef.collection('donations');

        this.state = {
            canDonate: true,
            donationAmount: "1",
            initialPoints: props.userData.points,
            remainingPoints: props.userData.points - 500,
            selectedCharity: 0,
            showConfirmation: false,
            recentDonation: {
                amount: 0,
                charity: ''
            }
        }
    }

    componentDidMount() {
        // Reset donation to £1 when component loads
        this.updateDonation("1");
    }

    updateDonation = (amount) => {
        // convert money donation into points
        let remaining = this.moneyToPoints(amount);

        // Determine if there are enough points available
        let validDonation = this.validateDonation(amount, remaining);

        this.setState({
            canDonate: validDonation,
            donationAmount: amount.replace(/[^0-9]/g, ''),
            remainingPoints: remaining
        });
    }

    validateDonation = (amount, remaining) => {
        if (remaining < 0 || amount == 0) {
            return false
        }

        return true
    }

    moneyToPoints = (amount) => {
        let used = amount * 625;
        return this.state.initialPoints - used;
    }

    submitDonation = () => {
        if (this.state.canDonate) {
            this.donateRef.add({
                amount: this.state.donationAmount,
                charity: charityList[this.state.selectedCharity].name,
                date: new Date()
            }).then((docRef) => {
                this.setState({
                    selectedCharity: 0,
                    donationAmount: "1",
                    initialPoints: this.state.remainingPoints,
                    remainingPoints: this.state.remainingPoints - 625,
                    recentDonation: {
                        amount: this.state.donationAmount,
                        charity: charityList[this.state.selectedCharity].name
                    }
                });
                this.updateUser();

                this.toggleConfirmation(true);

                this.validateDonation(1, this.state.remainingPoints);

            }).catch((error) => {
                console.log("Error finding document: ", error);
            })
        } else {
            Alert.alert('Donation is invalid.')
        }
    }

    updateUser = () => {
        this.userRef.update({
            points: this.state.initialPoints
        }).catch((error) => {
            console.log("Error updating document: ", error);
        })
    }

    toggleConfirmation = (toggle) => {
        this.setState({
            showConfirmation: toggle
        });
    }

    render() {
        const width = Dimensions.get('window').width;
        return (
            <Container>
                { !this.state.showConfirmation && <DonateStats>
                    <Icon name="gbp" size={20} color={colours.white} />
                    <DonateAmount ref="textInput" value={this.state.donationAmount} keyboardType="numeric" 
                        maxLength={3} onChangeText={value => this.updateDonation(value)} /> 
                    <Decimal>.00</Decimal>
                </DonateStats>
                }

                { !this.state.showConfirmation &&
                    <PointsRemaining>Points Remaining: {this.state.remainingPoints}</PointsRemaining>
                }


                { !this.state.showConfirmation && <CharityWrapper>
                    <ChangeCharity disabled={this.state.selectedCharity==0} 
                        onPress={() => this.refs.charities.scrollBy(-1)}>
                        <FontAwesome name="chevron-circle-left" size={30} 
                            color={this.state.selectedCharity == 0 ? colours.unselected : colours.white} />
                    </ChangeCharity>

                    <Swiper ref="charities" loop={false} 
                        showsPagination={false} showsButtons={false} 
                        onIndexChanged={(index) => this.setState({selectedCharity: index})}
                        containerStyle={{width}}>
                        {
                        charityList.map((charity, index) => (
                            <CharitySlider key={index}>
                                <CharityTitle>
                                    <CharityLogo source={{uri: charity.logo}} />
                                    <Title>{charity.name}</Title>
                                </CharityTitle>
                                
                                <CharityInfo>{charity.description}</CharityInfo>
                            </CharitySlider>

                        ))
                        }
                    </Swiper>

                    <ChangeCharity disabled={this.state.selectedCharity == (charityList.length - 1)} 
                        onPress={() => this.refs.charities.scrollBy(1)}>
                        <FontAwesome name="chevron-circle-right" size={30} 
                            color={this.state.selectedCharity == (charityList.length - 1) ? colours.unselected : colours.white} />
                    </ChangeCharity>
                </CharityWrapper> }
                

                { !this.state.showConfirmation && <BottomBar>
                    <PageIndicator>
                        {charityList.map((c, i) => (
                            <FontAwesome name="minus" size={20} style={{margin: 3}}
                                color={this.state.selectedCharity === i ? colours.white : colours.unselected} />
                        ))}
                    </PageIndicator>

                    <SubmitDonation onPress={() => this.submitDonation()} 
                        canDonate={this.state.canDonate} disabled={!this.state.canDonate}>
                        <DonationText>Donate  £{this.state.donationAmount}</DonationText>
                    </SubmitDonation>
                </BottomBar>
                }

                {this.state.showConfirmation && 
                    <DonateConfirm remaining={this.state.initialPoints} donateInfo={this.state.recentDonation}
                        toggleView={this.toggleConfirmation} />
                }
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
`;

const CharityWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 200px;
    padding: 10px;
`;

const CharitySlider = styled.View`
    border: 2px solid ${colours.white};
    background-color: ${colours.white};
    width: 95%;
    border-radius: 10px;
    padding: 20px;
    align-self: center;
    justify-content: center;
`;

const CharityTitle = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
`;

const CharityLogo = styled.Image`
    width: 40px;
    height: 40px;
    resize-mode: contain;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
`;

const CharityInfo = styled.Text`
    font-size: 12px;
`;

const ChangeCharity = styled.TouchableOpacity`
    height: 200px;
    justify-content: center;
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
    font-size: 32px;
    padding: 2%;
    text-align: center;
`;

const PointsRemaining = styled.Text`
    color: ${colours.unselected};
    text-align: center;
    font-size: 14px;
    margin: 2%;
`;

const Decimal = styled.Text`
    font-size: 15px;
    color: ${colours.white};
`;

const BottomBar = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    position: absolute;
    bottom: 60px;
    align-items: center;
`;

const PageIndicator = styled.View`
    flex-direction: row;
    padding: 15px;
`;

const SubmitDonation = styled.TouchableOpacity`
    background-color: ${props => props.canDonate ? colours.white : colours.unselected};
    align-self: flex-end;
    border-radius: 10px;
    padding: 15px;
    align-items: center;
`;

const DonationText = styled.Text`
    color: ${colours.green};
    font-size: 20px;
    font-weight: 600;
`;

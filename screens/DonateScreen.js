import React, { Component } from 'react';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import { FontAwesome } from '@expo/vector-icons';

import colours from '../components/Colours';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalBar from '../components/ModalBar';
import { colors } from 'react-native-elements';
import {charityList} from '../data/charities';


export default class DonateScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            canDonate: true,
            donationAmount: "1",
            initialPoints: 14,
            remainingPoints: -1,
            selectedCharity: 0
        }
    }

    componentDidMount() {
        // Get the total points

        // Convert points to money value

        // Update donation
        this.updateDonation("1");
    }

    updateDonation = (amount) => {
        let remaining = this.moneyToPoints(amount);
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
        let used = amount * 500;
        return this.state.initialPoints - used;
    }

    render() {
        return (
            <Container>
                <DonateStats>
                    <Icon name="gbp" size={20} color={colours.white} />
                    <DonateAmount ref="textInput" value={this.state.donationAmount} keyboardType="numeric" 
                    maxLength={3} 
                    onChangeText={value => this.updateDonation(value)} /> 
                    <Decimal>.00</Decimal>
                </DonateStats>

                <PointsRemaining>Points Remaining: {this.state.remainingPoints}</PointsRemaining>


                <CharityWrapper>
                    <ChangeCharity disabled={this.state.selectedCharity==0} 
                        onPress={() => this.refs.charities.scrollBy(-1)}>
                        <FontAwesome name="chevron-circle-left" size={30} 
                            color={this.state.selectedCharity == 0 ? colours.unselected : colours.white} />
                    </ChangeCharity>

                    <Swiper ref="charities" loop={false} 
                        showsPagination={false} showsButtons={false} 
                        onIndexChanged={(index) => this.setState({selectedCharity: index})}>
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

                    <ChangeCharity disabled={this.state.selectedCharity==2} 
                        onPress={() => this.refs.charities.scrollBy(1)}>
                        <FontAwesome name="chevron-circle-right" size={30} 
                            color={this.state.selectedCharity == 2 ? colours.unselected : colours.white} />
                    </ChangeCharity>
                </CharityWrapper>
                

                <BottomBar>
                    <PageIndicator>
                        <FontAwesome name="minus" size={20} style={{margin: 3}}
                            color={this.state.selectedCharity === 0 ? colours.white : colours.unselected} />
                        <FontAwesome name="minus" size={20} style={{margin: 3}}
                            color={this.state.selectedCharity === 1 ? colours.white : colours.unselected} />
                        <FontAwesome name="minus" size={20} style={{margin: 3}}
                            color={this.state.selectedCharity === 2 ? colours.white : colours.unselected} />
                    </PageIndicator>

                    <SubmitDonation canDonate={this.state.canDonate} disabled={!this.state.canDonate}>
                        <DonationText>Donate  £{this.state.donationAmount}</DonationText>
                    </SubmitDonation>
                </BottomBar>
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
    width: 50px;
    height: 50px;
    resize-mode: contain;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
`;

const CharityInfo = styled.Text`
    font-size: 14px;
`;

const ChangeCharity = styled.TouchableOpacity`

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

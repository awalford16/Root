import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {Text} from 'react-native';

import colours from '../components/Colours';
import firebase from '../components/Firebase';
import {transportList} from '../data/transport';

export default class JourneyEndScreen extends Component {
    constructor(props) {
        super(props);

        // Get journey from firebase database
        this.ref = firebase.firestore().collection('journeys').doc(props.route.params.docId);
        this.userRef = firebase.firestore().collection('users').doc('DbxeQr62SuBFdNnVBLZY');

        this.state = {
            points: 0,
            co2: 0,
            transport: props.route.params.transport,
            userPoints: 0,
            userCO2: 0
        }
    }

    componentDidMount() {
        // Get all details about journey and save to state
        this.ref.get().then((doc) => {
            let data = doc.data();

            this.setState({
                points: data.totalPoints,
                co2: data.totalCO2
            });
        })

        this.userRef.get().then((doc) => {
            let data = doc.data();
            this.setState({
                userPoints: data.points,
                userCO2: data.co2
            })
        })
    }

    render() {
        const {navigation, route} = this.props;
        return(
            <Container>
                <TitleBar>
                    <FontAwesome name="user-circle-o" size={50} color={colours.white} />
                    <Title>Journey Complete!</Title>
                </TitleBar>

                <Ionicons name="ios-walk" size={60} color={colours.white}
                    style={{alignSelf: 'center'}} />

                <StatsWrapper>
                    <StatBox>
                        <FontAwesome name="leaf" size={32} color={colours.green} />
                        <TotalWrapper>
                            <Total>{this.state.points}</Total>
                            <Scale>pts</Scale>
                        </TotalWrapper>
                    </StatBox>
                    <StatBox>
                        <MaterialCommunityIcons name="periodic-table-co2" size={32} color={colours.red} />
                        <TotalWrapper>
                            <Total style={{color: colours.red}}>{this.state.co2}</Total>
                            <Scale style={{color: colours.red}}>kg</Scale>
                        </TotalWrapper>
                    </StatBox>
                </StatsWrapper>

                <Overall>
                    <TotalPoints>Total Statistics:</TotalPoints>
                    <TotalStatsWrapper>
                        <TotalScoreWrapper>
                            <FontAwesome name="leaf" size={32} color={colours.white} />
                            <TotalScore>{this.state.userPoints}</TotalScore>
                        </TotalScoreWrapper>
                        <TotalScoreWrapper>
                            <MaterialCommunityIcons name="periodic-table-co2" size={32} color={colours.white} />
                            <TotalScore>{this.state.userCO2}</TotalScore>
                        </TotalScoreWrapper>
                    </TotalStatsWrapper>
                </Overall>

                <DoneButton onPress={() => navigation.navigate('Home')}>
                    <Done>Done</Done>
                </DoneButton>
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
    background-color: ${colours.green};
`;

const TitleBar = styled.View`
    justify-content: flex-end;
    width: 100%;
    height: 180px;
    align-items: center;
    margin-bottom: 30px;
`;

const Title = styled.Text`
    color: ${colours.white};
    font-size: 30px;
    font-weight: 600;
    padding: 10px;
`;

const StatsWrapper = styled.View`
    flex: 0.4;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 40px;
`;

const StatBox = styled.View`
    width: 120px;
    height: 120px;
    align-items: center;
    background-color: ${colours.white};
    border-radius: 80px;
    justify-content: center;
`;

const TotalWrapper = styled.View`
    flex-direction: row;
`;

const Total = styled.Text`
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    color: ${colours.green};
`;

const Scale = styled.Text`
    font-size: 15px;
    align-self: flex-end;
    color: ${colours.green};
`;

const Overall = styled.View`
    width: 80%;
    border-top-color: ${colours.white};
    border: 1px solid ${colours.green};
    align-self: center;
`;

const TotalPoints = styled.Text`
    color: ${colours.white};
    font-size: 18px;
    padding: 10px;
`;

const TotalStatsWrapper = styled.View`
    width: 80%;
    flex-direction: row;
    justify-content: space-evenly;
    align-self: center;
`;

const TotalScoreWrapper = styled.View`
    align-items: center;
    margin: 10px;
`;

const TotalScore = styled.Text`
    font-weight: 600;
    font-size: 25px;
    color: ${colours.white};
`;

const DoneButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 100px;
    align-self: center;
    padding: 10px;
    border-radius: 30px;
    border: 1px solid ${colours.white};
    width: 40%;
`;

const Done = styled.Text`
    color: ${colours.white};
    font-size: 20px;
    text-align: center;
    font-weight: 600;
`;
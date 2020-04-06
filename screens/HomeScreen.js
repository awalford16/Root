import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StatusBar, Text} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import colours from '../components/Colours';
import TransportOptions from '../components/TransportOptions';
import DonateButton from '../components/DonateButton';
import MapContainer from '../components/MapContainer';
import StartButton from '../components/StartButton';
import Destination from '../components/Destination';
import JourneyStats from '../components/JourneyStats';
import TitleBar from '../components/TitleBar';
import DonateScreen from './DonateScreen';
import ModalScreen from './ModalScreen';
import firebase from '../components/Firebase';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection("users").doc('DbxeQr62SuBFdNnVBLZY');

        this.unsubscribe = null;
        this.state = {
            modalVisible: false, 
            journeyReady: false,
            journeyInfo: {
                location: "",
                time: 0,
                timeMeasure: 'm',
                dist: 0,
                points: 0,
                co2: 0,
                region: {
                    latitude: null,
                    longitude: null
                },
                destination: {
                    latidtude: null,
                    longitude: null
                }
            },
            transportInfo: {
                method: "WALKING",
                icon: "ios-walk",
                maxSpeed: 5
            },
            userData: {
                points: 0,
                co2: 0,
                img: require('../assets/user-picture.png')
            }
        }
    }

    componentDidMount() {
        this.setState(this.baseState);

        // Update user info whenever firebase data changes
        this.unsubscribe = this.ref.onSnapshot(this.onUserUpdate);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onUserUpdate = (doc) => {
        let user = {};
        
        const {name, points, co2, image} = doc.data();
        user = {
            name: name,
            points: points,
            co2: co2,
            img: image
        }

        this.setState({
            userData: user,
            isRefreshing: false
        });
    }

    componentDidCatch(error, info) {
        console.log(error, info.componentStack);
    }

    handleTransportChange = (opt) => {
        this.setState({transportInfo: {
            method: opt.title, 
            icon: opt.icon,
            maxSpeed: opt.speed
        }});
    }

    updateJourney = (dest, time, dist, reg, end) => {
        if (dist == 0) return;
        
        // Calculate co2 in kg
        let co2_kg = dist;
        switch(this.state.transportInfo.method) {
            case "BICYCLING":
                co2_kg *= 0.012;
                break;
            case "DRIVING":
                co2_kg *= 0.287;
                break;
            default:
                co2_kg *= 0.016;
                break;
        }

        // Determine points from CO2
        let score = 2 / co2_kg;
        if (dist < 1 && dist > 0) {
            score *= (dist / 2);
        }

        // Convert mins to hours
        let measure = 'm'
        if (time >= 60) {
            time /= 60;
            time = time.toFixed(0);
            measure = 'hrs';
        }

        this.setState({
            journeyReady: true,
            journeyInfo: {
                location: dest,
                time: time,
                timeMeasure: measure,
                dist: dist,
                region: reg,
                destination: end,
                co2: co2_kg,
                points: score.toFixed(0)
            }
        });
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible})
    }

    resetState = () => {
        this.setState({
            journeyReady: false
        });
    }
    
    render() {
        return (
            <Container>
                <StatusBar  
                    barStyle = "dark-content"   
                    hidden = {false}
                /> 
                <TitleBar showModal={this.setModalVisible} modalVisible={this.state.modalVisible} userData={this.state.userData} />

                <TransportOptions selected={this.state.transportInfo.method} changeTransport={this.handleTransportChange} />

                <MapContainer journeyReady={this.state.journeyReady} transportMode={this.state.transportInfo.method} updateJourney={this.updateJourney} />

                {
                    this.state.journeyReady && <JourneyStats journeyInfo={this.state.journeyInfo} transport={this.state.transportInfo} />
                }

                {/* { !this.state.journeyReady && <DonateButton /> } */}
                <ModalScreen userData={this.state.userData} showModal={this.setModalVisible} modalVisible={this.state.modalVisible} />

                {!this.state.modalVisible && !this.state.journeyReady && 
                    <DonationToggle onPress={() => this.setModalVisible(true)}>
                        <ToggleText>Donate</ToggleText>
                        <FontAwesome name="handshake-o" size={20} color={colours.white} />
                    </DonationToggle>
                }

                {   this.state.journeyReady && 
                    <FontAwesome name="times-circle" 
                        onPress={() => this.resetState()} size={32} color={colours.grey}
                        style={{position: 'absolute', bottom: 150, alignSelf: 'center'}} />
                }
            </Container>
        )
    }
}

const Container = styled.View`
    background-color: ${colours.background};
    flex: 1;
`;

const DonationToggle = styled.TouchableOpacity`
    flex: 0.2;
    position: absolute;
    bottom: 40px;
    width: 35%;
    height: 50px;
    background-color: ${colours.green};
    align-self: center;
    padding: 15px;
    align-items: center;
    flex-direction: row;
    border-radius: 50px;
    justify-content: space-evenly;
`;

const ToggleText = styled.Text`
    color: ${colours.white};
    font-size: 20px;
`;

const CancelButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 150px;
    background-color: ${colours.white};
    padding: 10px;
    align-self: center;
    border-radius: 30px;
`;
import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import colours from '../components/Colours';
import TransportOptions from '../components/TransportOptions';
import DonateButton from '../components/DonateButton';
import MapContainer from '../components/MapContainer';
import StartButton from '../components/StartButton';
import Destination from '../components/Destination';
import JourneyStats from '../components/JourneyStats';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTransport: "WALKING",
            transportIcon: "ios-walk",
            journeyReady: false,
            journeyInfo: {
                location: "",
                time: 0,
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
            }

        }
        this.handleTransportChange = this.handleTransportChange.bind(this);
    }

    handleTransportChange = (opt) => {
        this.setState({transportInfo: {
            method: opt.title, 
            icon: opt.icon,
            maxSpeed: opt.speed
        }});
    }

    updateJourney = (dest, time, dist, reg, end) => {
        // Calculate stats

        console.log(dest);
        this.setState({
            journeyReady: true,
            journeyInfo: {
                location: dest,
                time: time,
                dist: dist,
                region: reg,
                destination: end
            }
        });
    }
    
    render() {
        return (
            <Container>
                <Titlebar>
                    <Icon name="user-circle" size={32} color={colours.white} style={{ position:'absolute', left: 30, top: 60 }} />
                    <Title>GreenPath</Title>
                    <Icon name="leaf" size={32} color={colours.white} style={{ position:'absolute', right: 30, top: 60 }} />
                </Titlebar>

                <TransportOptions selected={this.state.transportInfo.method} changeTransport={this.handleTransportChange} />

                <MapContainer transportMode={this.state.selectedTransport} updateJourney={this.updateJourney} />

                {
                    this.state.journeyReady && <JourneyStats />
                }

                <DonateButton />

                <StartButton 
                    journeyReady={this.state.journeyReady} 
                    stats={this.state.journeyInfo} 
                    transport={this.state.transportInfo}
                    />
            </Container>
        )
    }
}

const Container = styled.View`
    background-color: ${colours.background};
    flex: 1;
`;

const Titlebar = styled.View`
    background-color: ${colours.green};
    width: 100%;
    height: 120px;
    padding-top: 60px;
`;

const Title = styled.Text`
    color: ${colours.white};
    font-weight: 600;
    font-size: 30px;
    text-align: center;
`;

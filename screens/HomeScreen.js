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
    }

    handleTransportChange = (opt) => {
        this.setState({transportInfo: {
            method: opt.title, 
            icon: opt.icon,
            maxSpeed: opt.speed
        }});
    }

    updateJourney = (dest, time, dist, reg, end) => {
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
        let score = 1 / co2_kg;
        if (dist < 1) {
            score *= (dist / 3);
        }

        this.setState({
            journeyReady: true,
            journeyInfo: {
                location: dest,
                time: time,
                dist: dist,
                region: reg,
                destination: end,
                co2: co2_kg.toFixed(1),
                points: score.toFixed(0)
            }
        });
    }
    
    render() {
        return (
            <Container>
                <Titlebar>
                    <Icon name="user-circle" size={32} color={colours.white} style={{ position:'absolute', left: 30, top: 60 }} />
                    <Title>Root</Title>
                    <Icon name="leaf" size={32} color={colours.white} style={{ position:'absolute', right: 30, top: 60 }} />
                </Titlebar>

                <TransportOptions selected={this.state.transportInfo.method} changeTransport={this.handleTransportChange} />

                <MapContainer journeyReady={this.state.journeyReady} transportMode={this.state.transportInfo.method} updateJourney={this.updateJourney} />

                {
                    this.state.journeyReady && <JourneyStats journeyInfo={this.state.journeyInfo} transport={this.state.transportInfo} />
                }

                {/* { !this.state.journeyReady && <DonateButton /> } */}
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

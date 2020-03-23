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
import TitleBar from '../components/TitleBar';
import DonateScreen from './DonateScreen';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

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
                co2: co2_kg.toFixed(1),
                points: score.toFixed(0)
            }
        });
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible})
    }
    
    render() {
        return (
            <Container>
                <TitleBar showModal={this.setModalVisible} modalVisible={this.state.modalVisible} />

                <TransportOptions selected={this.state.transportInfo.method} changeTransport={this.handleTransportChange} />

                <MapContainer journeyReady={this.state.journeyReady} transportMode={this.state.transportInfo.method} updateJourney={this.updateJourney} />

                {
                    this.state.journeyReady && <JourneyStats journeyInfo={this.state.journeyInfo} transport={this.state.transportInfo} />
                }

                {/* { !this.state.journeyReady && <DonateButton /> } */}
                <DonateScreen showModal={this.setModalVisible} modalVisible={this.state.modalVisible} />
            </Container>
        )
    }
}

const Container = styled.View`
    background-color: ${colours.background};
    flex: 1;
`;


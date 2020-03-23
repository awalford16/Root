import React, {Component} from 'react';
import styled from 'styled-components';
import {Dimensions, Text} from 'react-native'; 

import colours from '../components/Colours';
import { RouteProp } from '@react-navigation/core';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Map from '../components/Map';

export default class JourneyScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: 0,
            alertCount: 0,
            currentPoints: 0
        }
    }

    // Initialise accelerometer
    componentDidMount() {
        this.watchPosition = navigator.geolocation.watchPosition(
            (position) => {
                // Conver mps to kmh
                let kmh = position.coords.speed * 3.86;
                if (kmh < 0) kmh = 0;
                
                this.setState({speed: (kmh).toFixed(0)});
            }
        );
    }

    componentDidUpdate() {
        let speed = this.props.route.params.transport.maxSpeed;

        // Only send one alert
        if (this.state.speed >= speed && this.state.alertCount == 0) {
            this.setState({alertCount: 1})
            alert("Have you selected the right transport method? You're going a little fast!\n\nWe will stop tracking until a good speed is reached or a new transport method is selected.");
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchPosition);
    }

    render() {
        const {navigation, route} = this.props;
        const maxLimit = 20;

        return(
            <Container>
                <TitleBar>
                    <TitleLocation>{ ((route.params.stats.location).length> maxLimit ?
                        (((route.params.stats.location).substring(0,maxLimit-3)) + '...') : route.params.stats.location 
                    )}</TitleLocation>
                </TitleBar>

                <MapContainer>
                    {route.params.stats.destination.latitude ? <Map 
                        region={route.params.stats.region} 
                        destination={route.params.stats.destination} /> : <Text>No Map Available</Text> 
                    }
                </MapContainer>
                

                <TransportMethod>
                    <Ionicons name={route.params.transport.icon} size={32} color={colours.white} />
                </TransportMethod>

                <JourneyStats style={{position: 'absolute', bottom: 0}}>
                    <StatBox>
                        <Ionicons name="md-stopwatch" size={32} style={{alignSelf: 'center'}} />

                        <ValueContainer>
                            <Value>{route.params.stats.time}</Value>
                            <Scale>{route.params.stats.timeMeasure}</Scale>
                        </ValueContainer>
                    </StatBox>

                    <StatBox>
                        <FontAwesome name="road" size={32} style={{alignSelf: 'center'}} />
                        
                        <ValueContainer>
                            <Value>{route.params.stats.dist}</Value>
                            <Scale>km</Scale>
                        </ValueContainer>
                    </StatBox>

                    <StatBox>
                        <Ionicons name="md-speedometer" size={32} style={{alignSelf: 'center'}} />
                        
                        <ValueContainer>
                            <Value>{this.state.speed}</Value>
                            <Scale>km/h</Scale>
                        </ValueContainer>
                    </StatBox>
{/* 
                    <StatBox>
                        <MaterialCommunityIcons name="periodic-table-co2" size={32} style={{alignSelf: 'center'}} />
                        
                        <ValueContainer>
                            <Value>0</Value>
                            <Scale>g</Scale>
                        </ValueContainer>
                    </StatBox> */}

                    <EndJourney onPress={() => navigation.navigate('Home')}>
                        <FontAwesome name="stop-circle" size={60} color={colours.red} />
                    </EndJourney>

                </JourneyStats>

            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    background-color: ${colours.background};
`;

const TitleBar = styled.View`
    background-color: ${colours.green};
    height: 100px;
    width: 100%;
    flex-direction: row;
    position: absolute;
    top: 0px;
    padding-top: 15%;
    justify-content: center;
`;

const TitleLocation = styled.Text`
    color: ${colours.white};
    font-size: 25px;
    width: 60%;
    height: 50%;
    text-align: center;
`;

const MapContainer = styled.View`
    flex: 1;
    width: 100%;
    z-index: -1;
    justify-content: center;
    flex-direction: row;
`;

const JourneyStats = styled.View`
    background-color: ${colours.white};
    width: 100%;
    height: 250px;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    border-top-color: ${colours.green};
    border-top-width: 40px;
`;

const TransportMethod = styled.View`
    width: 50px;
    padding: 10px;
    border-radius: 50px;
    position: absolute;
    bottom: 200px;
    z-index: 1;
    align-self: center;
`;

const StatBox = styled.View`
    margin: 20px;
    width: 20%;
    height: 25%;
    border-radius: 20px;
    justify-content: center;
`;

const HideJourney = styled.TouchableOpacity`
    background-color: ${colours.grey};
    padding: 15px;
    border-radius: 50px;
    width: 30%;
    margin-right: 20px;
`;

const ValueContainer = styled.View`
    flex-direction: row;
    align-content: center;
    justify-content: center;
`;

const Value = styled.Text`
    text-align: center;
    color: ${colours.black};
    font-size: 35px;
`;

const Scale = styled.Text`
    font-size: 15px;
    align-self: flex-end;
`;

const EndJourney = styled.TouchableOpacity`
    padding: 15px;
    border-radius: 50px;
`;
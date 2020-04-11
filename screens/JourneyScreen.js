import React, {Component} from 'react';
import styled from 'styled-components';
import {Dimensions, Text} from 'react-native'; 
import {getDistance} from 'geolib';

import colours from '../components/Colours';
import { RouteProp } from '@react-navigation/core';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Map from '../components/Map';
import firebase from '../components/Firebase';

export default class JourneyScreen extends Component {
    constructor(props) {
        super(props);

        this.userRef = firebase.firestore().collection('users').doc('DbxeQr62SuBFdNnVBLZY');
        this.ref = this.userRef.collection('journeys');

        this.state = {
            speed: 0,
            alertCount: 0,
            pointsEarned: 0,
            currentCO2: 0,
            distance: props.route.params.stats.dist,
            totalDistance: 0,
            prevPos: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    // Initialise accelerometer
    componentDidMount() {
        this._watchLocation();
    }

    componentDidUpdate() {
        let maxSpeed = this.props.route.params.transport.maxSpeed;

        // Only send one alert
        if (this.state.speed >= maxSpeed && this.state.alertCount == 0) {
            this.setState({alertCount: 1})
            alert("Have you selected the right transport method? You're going a little fast!\n\nWe will stop tracking until a good speed is reached or a new transport method is selected.");
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchPosition);
    }

    _watchLocation = () => {
        // determine how many points earnt per meter
        let pointsPerM = this.props.route.params.stats.points / (this.props.route.params.stats.dist * 1000);

        this.watchPosition = navigator.geolocation.watchPosition(
            (position) => {
                // Conver mps to kmh
                let kmh = position.coords.speed * 3.86;
                if (kmh < 0) kmh = 0;
                
                this.setState({speed: (kmh).toFixed(0)});

                let currentPos = {latitude: position.coords.latitude, longitude: position.coords.longitude};

                // calculate distance to destination
                let dist = this._getDistance(currentPos, {
                    latitude: this.props.route.params.stats.destination.latitude,
                    longitude: this.props.route.params.stats.destination.longitude
                });

                // Calculate CO2 from previous
                let co2 = 0;
                let delta = 0;
                if (!currentPos == this.state.prevPos) {
                    delta = this._getDistance(currentPos, this.state.prevPos);
                    co2 = this._getCO2(delta / 1000);
                }

                // Calculate points earnt if the user has moved
                let currentPoints = 0;
                if (delta > 0) {
                    currentPoints = (this.props.route.params.stats.points - (pointsPerM * dist)).toFixed(0)
                    if (currentPoints < 0) currentPoints = 0;
                }
                
                // Update state
                this.setState({
                    pointsEarned: parseInt(currentPoints),
                    prevPos: currentPos,
                    currentCO2: parseInt(this.state.currentCO2 + co2),
                    distance: (dist / 1000).toFixed(1)
                });

                // End the journey if the user is within 100 meters of destination
                if (dist < 0.5) {
                    this.onEndJourney();
                }
            }, 
            (error) => {
                alert(error);
            }, 
            {enableHighAccuracy: true, distanceFilter: 0, timeout: 250, maximumAge: 10}
        );
    }

    _getDistance = (start, end) => {
        let distance = getDistance(start, end)

        // Return distance in kilometers
        return distance;
    }

    _getCO2 = (dist) => {
        // Calculate co2 in kg
        let co2_kg = dist;
        switch(this.props.route.params.transport.method) {
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

        return co2_kg;
    }

    // Upload journey to firebase
    onEndJourney = () => {
        // Only upload journey if user earns points
        this.userRef.get().then((user) => {
            let userPoints = user.data().points + this.state.pointsEarned;
            let userCO2 = user.data().co2 + this.state.currentCO2;

            this.userRef.update({
                points: userPoints,
                co2: userCO2
            })

            this.ref.add({
                journey: this.props.route.params.stats.destination,
                totalPoints: this.state.pointsEarned,
                totalCO2: this.state.currentCO2,
                method: this.props.route.params.transport.icon,
                date: new Date(),
                user: user.data().name
            }).then((doc) => {
                this.props.navigation.navigate('JourneyEnd', {docId: doc.id});
            })
        }).catch((error) => {
            alert("Sorry, we were unable to log your journey.");
        })
    }

    render() {
        const {navigation, route} = this.props;
        const maxLimit = 30;

        return(
            <Container>
                <MapContainer>
                    {route.params.stats.destination.latitude ? <Map 
                        region={route.params.stats.region} 
                        destination={route.params.stats.destination} /> : <Text>No Map Available</Text> 
                    }
                </MapContainer>
                

                <JourneyInfo>
                    <Ionicons name={route.params.transport.icon} size={32} color={colours.white} />
                    <TitleLocation>{ ((route.params.stats.location).length> maxLimit ?
                        (((route.params.stats.location).substring(0,maxLimit-3)) + '...') : route.params.stats.location 
                    )}</TitleLocation>
                </JourneyInfo>

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
                            <Value>{this.state.distance}</Value>
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

                    <EndJourney onPress={() => this.onEndJourney()}>
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
    background-color: ${colours.white};
    height: 100px;
    width: 100%;
    flex-direction: row;
    position: absolute;
    top: 0px;
    padding-top: 15%;
    justify-content: center;
    border: 1px solid ${colours.green};
`;

const TitleLocation = styled.Text`
    color: ${colours.white};
    font-weight: 600;
    font-size: 20px;
    width: 100%;
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
    height: 200px;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`;

const JourneyInfo = styled.View`
    width: 100%;
    padding: 10px;
    position: absolute;
    bottom: 24%;
    z-index: 1;
    align-self: center;
    background-color: ${colours.green};
    align-items: center;
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
    font-size: 30px;
`;

const Scale = styled.Text`
    font-size: 15px;
    align-self: flex-end;
`;

const EndJourney = styled.TouchableOpacity`
    padding: 15px;
    border-radius: 50px;
`;
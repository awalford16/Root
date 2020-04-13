import React, {Component} from 'react';
import styled from 'styled-components';
import * as Permissions from 'expo-permissions';
import {Text} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Destination from './Destination';
import Map from './Map';
import colours from './Colours';
import { Dimensions } from 'react-native';

export default class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, 
            location: null,
            errorMessage: null,
            locationEnabled: true,
            region: {
                latitude:null,
                longitude:null,
                latitudeDelta:null,
                longitudeDelta:null
            },
            destination: {
                latitude: null,
                longitude: null
            }
        }
    }

    calcDelta = (lat, lon) => {
        let {width, height} = Dimensions.get('window');
        const aspect = width / height; 

        const latDelta = 0.005;
        const lonDelta = latDelta / aspect;

        this.setState({
            isLoading: false,
            region: {
                latitude: lat,
                longitude: lon,
                latitudeDelta: latDelta,
                longitudeDelta: lonDelta
            }
        });
    }

    getPermissions = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({locationEnabled: false});
        } 
    }

    componentDidMount() {
        if (this.getPermissions()) {
            this.getLocation();
        }
    }

    updateDestination = (name, lat, lng) => {
        this.setState({
            destination: {
                name: name,
                latitude: lat,
                longitude: lng
            }
        });
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const acc = position.coords.accuracy;
                this.calcDelta(lat, lon);
            }
        )
    }

    updateLocation = () => {
        this.watchPosition = navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const acc = position.coords.accuracy;
                this.calcDelta(lat, lon);
            }
        )
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchPosition);
    }

    render() {
        return(
            <Container mapSize={this.state.journeyReady}>
                <Destination location={this.state.region} setDestination={this.updateDestination} />
                { this.state.region.latitude && this.state.locationEnabled ? <Map 
                    region={this.state.region} 
                    destination={this.state.destination} 
                    transportMode={this.props.transportMode}
                    updateJourney={this.props.updateJourney}
                    showDirections={this.props.journeyReady}
                /> : 
                <LocationError>
                    <FontAwesome name="map-marker" size={50} color={colours.grey} />
                    <Text>Please Enable Location Settings.</Text> 
                </LocationError>
                }
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
`;

const LocationError = styled.View`
    align-items: center;
    justify-content: center;
    flex: 0.6;
`;
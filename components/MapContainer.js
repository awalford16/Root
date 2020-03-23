import React, {Component} from 'react';
import styled from 'styled-components';
import Geocoder from 'react-native-geocoding';

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

    componentDidMount() {
        this.getLocation();
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
        navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const acc = position.coords.accuracy;
                this.calcDelta(lat, lon);
            }
        )
    }

    render() {
        return(
            <Container mapSize={this.state.journeyReady}>
                <Destination location={this.state.region} setDestination={this.updateDestination} />
                { this.state.region.latitude ? <Map 
                    region={this.state.region} 
                    destination={this.state.destination} 
                    transportMode={this.props.transportMode}
                    updateJourney={this.props.updateJourney}
                /> : null }
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
`;
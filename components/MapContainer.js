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
        console.log(this.state);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
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
            <Container>
                <Destination location={this.state.region} />
                { this.state.region.latitude ? <Map region={this.state.region} /> : null }
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 0.75;
`;
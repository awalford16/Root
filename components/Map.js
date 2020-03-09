import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {Dimensions} from 'react-native';
import styled from 'styled-components';

import colours from './Colours';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLodaing: true, 
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

    calcDelta = (lat, lon, acc) => {
        let {width, height} = Dimensions.get('window');
        const aspect = width / height; 

        const latDelta = 0.005;
        const lonDelta = latDelta / aspect;

        this.setState({
            region: {
                latitude: lat,
                longitude: lon,
                latitudeDelta: latDelta,
                longitudeDelta: lonDelta
            }
        });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude
                const acc = position.coords.accuracy
                this.calcDelta(lat, lon, acc)
            }
        )
    }

    marker = () => {
        return {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
        }
    }

    render() {
        return(
            <Container>
                {this.state.region.latitude ? 
                <MapView 
                    style={{
                        flex: 1}}
                    provider="google"
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    <MapView.Marker coordinate={this.marker()} />
                </MapView> : null}
            </Container>
            
        )
    }
}

const Container = styled.View`
    flex: 0.75;
    position: relative;
    top: -30px;
    z-index: -1;
    border: 1px solid ${colours.green};
`;
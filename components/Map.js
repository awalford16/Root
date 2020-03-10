import React, { Component } from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components';
import {Dimensions} from 'react-native';
import Geocoder from 'react-native-geocoder-reborn';

import colours from './Colours';

const Map = (props) => {
    console.log(props);
    return(
        <Container>
            <MapView 
                style={{flex: 1}}
                provider="google"
                initialRegion={props.region}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={true} />
        </Container>
            
    );
}

export default Map;

const Container = styled.View`
    flex: 1;
    position: relative;
    top: -30px;
    z-index: -1;
    border: 1px solid ${colours.green};
`;
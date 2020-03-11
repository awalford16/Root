import React from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components';
import MapViewDirections from 'react-native-maps-directions';

import colours from './Colours';
import {DIRECTIONS_KEY} from '../key';

const Map = (props) => {
    return(
        <Container>
            <MapView 
                style={{flex: 1}}
                provider="google"
                initialRegion={props.region}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={true}>

                {props.destination.latitude ? 
                    <MapView.Marker coordinate={props.destination} /> 
                : null}

                {props.destination.latitude ? 
                    <MapViewDirections 
                        origin={props.region} 
                        destination={props.destination} 
                        apikey={DIRECTIONS_KEY} 
                        strokeWidth={3}
                        strokeColor={colours.green}
                        mode={props.transportMode}
                        waypoints={[props.destination]}
                        onReady={result => {
                            console.log(`${result.distance}km`);
                            console.log(`${result.duration} min`);
                        }}
                    /> 
                : null}
            </MapView>
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
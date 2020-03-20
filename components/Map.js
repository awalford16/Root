import React, {useRef} from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components';
import MapViewDirections from 'react-native-maps-directions';

import colours from './Colours';
import {DIRECTIONS_KEY} from '../key';
import { Dimensions, Text } from 'react-native';

let mapView = null;
const {width, height} = Dimensions.get('window');

const Map = (props) => {
    return(
        <Container>
            <MapView 
                style={{flex: 1}}
                provider="google"
                initialRegion={props.region}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                ref={m => mapView = m}>

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
                            console.log(`${(result.distance).toFixed(1)}km`);
                            console.log(`${Math.ceil(result.duration)}min`);

                            props.updateJourney && props.updateJourney(props.destination.name, 
                                (result.duration).toFixed(0), 
                                (result.distance).toFixed(1), props.region, props.destination);

                            mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: (width / 8),
                                    bottom: (height / 8),
                                    left: (width / 8),
                                    top: (height / 8),
                                }
                            });
                        }}
                    /> 
                : <Text>No Map Available.</Text>}
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
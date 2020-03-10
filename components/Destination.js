import React, { Component } from 'react';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import styled from 'styled-components';
import PlacesInput from 'react-native-places-input';

import colours from './Colours';
import { View } from 'react-native';
import {PLACES_KEY} from '../key.js';
import LocationItem from './LocationItem';

export default class Destination extends Component {
    render() {
        return(
            <Container>
                <GoogleAutoComplete apiKey={PLACES_KEY} 
                    debounce={300} 
                    components="country:uk" 
                    radius={50} 
                    lat={this.props.location.latitude} 
                    lng={this.props.location.longitude}
                    queryTypes="establishment"> 
                    {({handleTextChange, locationResults, fetchDetails}) => (
                        <React.Fragment>
                            {console.log(locationResults)}
                            <View>
                                <DestinationInput 
                                    placeholder="Where to Today?"
                                    onChangeText={handleTextChange} />
                            </View>
                            <DestinationResults>
                                {locationResults.map(el => (
                                    <LocationItem
                                        key={el.id}
                                        {...el}
                                        fetchDetails={fetchDetails}
                                    />
                                ))}
                            </DestinationResults>
                        </React.Fragment>
                    )}
                </GoogleAutoComplete>
            </Container>
        );
    }
}


const Container = styled.View``;

const DestinationInput = styled.TextInput`
    background-color: ${colours.white};
    align-self: center;
    padding: 15px;
    font-size: 20px;
    color: ${colours.black};
    border: 1px solid ${colours.grey};
    width: 90%;
    font-weight: 500;
`;

const DestinationResults = styled.ScrollView`
    width: 90%;
    align-self: center;
    position: absolute;
    top: 50px;
    background-color: ${colours.white};
    border: 1px solid ${colours.grey};
`;
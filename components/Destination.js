import React, { Component } from 'react';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import colours from './Colours';
import { View, ActivityIndicator, Button } from 'react-native';
import {PLACES_KEY} from '../key.js';
import LocationItem from './LocationItem';

export default class Destination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayList: true,
            selectedDestination: ""
        }
    }

    hideSuggestions = () => {
        this.setState({
            displayList: false
        })
    }

    render() {
        return(
            <Container>
                <GoogleAutoComplete apiKey={PLACES_KEY} 
                    debounce={300} 
                    components="country:uk" 
                    radius="50" 
                    lat={this.props.location.latitude} 
                    lng={this.props.location.longitude}
                    queryTypes="establishment"
                    minLength={3}> 
                    {({handleTextChange, locationResults, fetchDetails, isSearching, inputValue, clearSearch}) => (
                        <React.Fragment>
                            {console.log(locationResults)}
                            <SearchBar>
                                <DestinationInput 
                                    placeholder="Where to Today?"
                                    onChangeText={handleTextChange} 
                                    value={inputValue}
                                    onFocus={() => this.setState({displayList: true})} />
                            </SearchBar>
                            
                            { this.state.displayList ? <DestinationResults>
                                {isSearching && <ActivityIndicator size="small" color={colours.grey} style={{padding: 20}} />}
                                {locationResults.map(el => (
                                    <LocationItem
                                        key={el.id}
                                        {...el}
                                        fetchDetails={fetchDetails}
                                        setDestination={this.props.setDestination}
                                        hideList={this.hideSuggestions}
                                    />
                                ))}
                            </DestinationResults> : null }
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
    padding: 10px;
    font-size: 15px;
    color: ${colours.black};
    border: 1px solid ${colours.grey};
    width: 80%;
    font-weight: 600;
`;

const DestinationResults = styled.ScrollView`
    width: 80%;
    align-self: center;
    position: absolute;
    top: 40px;
    background-color: ${colours.white};
    border: 1px solid ${colours.grey};
    max-height: 300px;
`;

const SearchBar = styled.View`
    align-content: center;
`;
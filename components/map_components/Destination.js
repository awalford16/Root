import React, { Component } from 'react';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import styled from 'styled-components';
import {FontAwesome} from 'react-native-vector-icons';

import colours from '../Colours';
import { View, ActivityIndicator, Button, Text } from 'react-native';
import {PLACES_KEY} from '../../key.js';
import LocationItem from './LocationItem';

export default class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayList: false
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
                                    clearButtonMode="always"
                                    placeholder="Where Are You Going Today?"
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
                                <HideList onPress={() => this.hideSuggestions()}>
                                    <FontAwesome name="angle-up" size={20} color={colours.grey} />
                                </HideList>
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
    padding: 15px;
    font-size: 12px;
    color: ${colours.black};
    border: 1px solid ${colours.grey};
    width: 80%;
    font-weight: 600;
    border-radius: 20px;
`;

const DestinationResults = styled.ScrollView`
    width: 80%;
    align-self: center;
    position: absolute;
    top: 50px;
    background-color: ${colours.white};
    border: 1px solid ${colours.grey};
    border-radius: 20px;
    max-height: 300px;
`;

const SearchBar = styled.View`
    align-content: center;
    flex-direction: row;
    justify-content: space-evenly;
`;

const ClearButton = styled.TouchableOpacity`
    position: absolute;
    right: 50px;
    align-self: center;
`;

const HideList = styled.TouchableOpacity`
    width: 100%;
    background-color: ${colours.white};
    align-items: center;
`;
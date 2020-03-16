import React, {Component} from 'react';
import {Accelerometer} from 'expo-sensors';
import styled from 'styled-components';
import {View, Text} from 'react-native'; 

import colours from '../components/Colours';

const Value = ({name, value}) => (
  <View>
    <Text>{name}:</Text>
    <Text>{new String(value.toFixed(1)).substr(0, 8)}</Text>
  </View>
)

export default class JourneyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 0
        }
    }

    // Initialise accelerometer
    componentDidMount() {
        this.watchPosition = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({speed: position.coords.speed});
            }
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchPosition);
    }

    render() {
        return(
            <Container>
                <Value name="x" value={this.state.speed} />
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    background-color: ${colours.background};
`;
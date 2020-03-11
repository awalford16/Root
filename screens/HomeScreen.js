import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import colours from '../components/Colours';
import TransportOptions from '../components/TransportOptions';
import DonateButton from '../components/DonateButton';
import MapContainer from '../components/MapContainer';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTransport: "WALKING",
            destination: ""
        }
        this.handleTransportChange = this.handleTransportChange.bind(this);
    }

    handleTransportChange = (opt) => {
        this.setState({selectedTransport: opt.title});

        // Calculate stats for destination, if set
    }
    
    render() {
        return (
            <Container>
                <Titlebar>
                    <Icon name="user-circle" size={32} color={colours.white} style={{ position:'absolute', left: 30, top: 60 }} />
                    <Title>GreenPath</Title>
                    <Icon name="leaf" size={32} color={colours.white} style={{ position:'absolute', right: 30, top: 60 }} />
                </Titlebar>

                <TransportOptions selected={this.state.selectedTransport} changeTransport={this.handleTransportChange} />

                <MapContainer transportMode={this.state.selectedTransport} />

                <DonateButton />

                <GoButton style={{ position:'absolute', bottom: 20, right: 5 }} 
                    disabled={!this.state.destination} 
                    destination={this.state.destination}
                    onPress={() => this.updateDestination(this.destination.value)}
                >
                    <GoText>START</GoText>
                    <Icon name="arrow-circle-right" size={55} 
                        color={this.state.destination ? colours.white : colours.grey} 
                        style={{alignSelf: 'center', padding: 3 }} 
                    />
                </GoButton>
            </Container>
        )
    }
}

const Container = styled.View`
    background-color: ${colours.background};
    flex: 1;
`;

const Titlebar = styled.View`
    background-color: ${colours.green};
    width: 100%;
    height: 120px;
    padding-top: 60px;
`;

const GoButton = styled.TouchableOpacity`
    margin: 20px;
    background-color: ${(props) => !props.destination ? colours.background : colours.green }
    flex-direction: row;
    border-radius: 30px;
`;

const GoText = styled.Text`
    color: ${colours.background};
    align-self: center;
    padding: 15px;
    font-size: 25px;
`;

const Title = styled.Text`
    color: ${colours.white};
    font-weight: 600;
    font-size: 30px;
    text-align: center;
`;

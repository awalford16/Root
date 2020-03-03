import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import colours from '../components/Colours';
import TransportOptions from '../components/TransportOptions';
import DonateButton from '../components/DonateButton';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTransport: "walk",
            destination: ""
        }
        this.handleTransportChange = this.handleTransportChange.bind(this);
        this.updateDestination = this.updateDestination.bind(this);
    }

    handleTransportChange = (opt) => {
        this.setState({selectedTransport: opt.title});

        // Calculate stats for destination, if set
    }

    updateDestination = (dest) => {
        // Search for destination

        this.setState({
            destination: dest
        });
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

                <Destination placeholder="Where to Today?" value={this.state.destination.value} onChangeText={this.updateDestination} />

                <DonateButton />

                <GoButton style={{ position:'absolute', bottom: 20, right: 5 }} 
                    disabled={!this.state.destination} 
                    destination={this.state.destination}
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

const Destination = styled.TextInput`
    width: 70%;
    background-color: ${colours.white};
    align-self: center;
    padding: 15px;
    font-size: 20px;
    text-align: center;
    color: ${colours.black};
    border: 1px solid ${colours.grey};
    border-radius: 30px;
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

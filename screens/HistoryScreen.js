import React, { Component } from 'react';
import styled from 'styled-components';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { FontAwesome } from '@expo/vector-icons';

import firebase from '../components/Firebase';
import colours from '../components/Colours';

const DeleteJourney = () => (
    <DeleteButton>
        <FontAwesome name='trash-o' size={25} color={colours.white} />
    </DeleteButton>
)

const Journey = ({data}) => {
    const swipeBtns = [{
        component: <DeleteJourney />,
        backgroundColor: colours.green,
        onPress: () => deleteJourney(data)
    }];

    return(
        <Swipeout right={swipeBtns} backgroundColor="transparent" autoClose="true">
            <JourneyContainer>
                <JourneyPoints>{data.points}</JourneyPoints>
                <LocationName>{data.destination}</LocationName>
            </JourneyContainer>
        </Swipeout>
    )
}

export default class HistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('users').doc('DbxeQr62SuBFdNnVBLZY').collection('journeys').orderBy("date", "desc");

        this.state = {
            journeys: [],
            isRefreshing: true
        }
    }

    componentDidMount() {
        this.ref.onSnapshot(this.onJourneyUpdate);
    }

    onJourneyUpdate = (querySnapshot) => {
        let journeys = [];

        querySnapshot.forEach((doc) => {
            const {date, totalPoints, journey, method} = doc.data();
            journeys.push({
                date: date,
                points: totalPoints,
                destination: journey.name,
                transport: method
            });
        });

        this.setState({
            journeys: journeys,
            isRefreshing: false
        })
    }

    render() {
        return(
            <Container>
                {this.state.journeys.length == 0 && !this.state.isRefreshing &&
                    <EmptyList>
                        <FontAwesome name="frown-o" size={60} color={colours.white} />
                        <EmptyMessage>You have not yet tracked any journeys.</EmptyMessage>
                    </EmptyList>
                }

                <SafeAreaView>
                    {!this.state.isRefreshing ? <FlatList 
                        data={this.state.journeys}
                        renderItem={({item}) => <Journey data={item} />}
                        keyExtractor={item => item.date} /> : <ActivityIndicator />}
                </SafeAreaView>
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
`;

const JourneyContainer = styled.View`
    border: 1px solid ${colours.white};
    padding: 10px;
    width: 90%;
    align-self: center;
    margin: 10px;
    flex-direction: row;
    align-items: center;
`;

const JourneyPoints = styled.Text`
    font-weight: 600;
    color: ${colours.white};
    font-size: 30px;
    margin: 5px;
`;

const LocationName = styled.Text`
    color: ${colours.white};
    font-size: 18px;
`;

const DeleteButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    margin: 10px;
    flex: 1;
`;

const EmptyList = styled.View`
    flex: 1;
    align-items: center;
    padding: 10px;
    justify-content: center;
`;

const EmptyMessage = styled.Text`
    color: ${colours.white};
    font-size: 15px;
    margin: 25px;
`;
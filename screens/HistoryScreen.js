import React, { Component } from 'react';
import styled from 'styled-components';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { FontAwesome } from '@expo/vector-icons';

import firebase from '../components/Firebase';
import colours from '../components/Colours';


export default class HistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.userRef = firebase.firestore().collection('users').doc('DbxeQr62SuBFdNnVBLZY');
        this.ref = firebase.firestore().collection('users').doc('DbxeQr62SuBFdNnVBLZY').collection('journeys');

        this.unsubscribe = null;
        this.state = {
            journeys: [],
            isRefreshing: true
        }
    }

    componentDidMount() {
        this.unsubscribe = this.ref.orderBy("date", "desc").onSnapshot(this.onJourneyUpdate);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onJourneyUpdate = (querySnapshot) => {
        let journeys = [];

        querySnapshot.forEach((doc) => {
            const {date, totalPoints, journey, method} = doc.data();
            journeys.push({
                id: doc.id,
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

    deleteJourney = (data) => {
        this.setState({
            isRefreshing: true
        })

        this.ref.doc(data.id).delete().then(() => {
            this.setState({
                isRefreshing: false
            })

            let decrement = firebase.firestore.FieldValue.increment(-(data.points));
            this.userRef.update({
                points: decrement
            })
        });
    }

    render() {
        const DeleteJourney = ({data}) => (
            <DeleteButton onPress={() => this.deleteJourney(data)}>
                <FontAwesome name='trash-o' size={25} color={colours.white} />
            </DeleteButton>
        )

        const Journey = ({data}) => {
            const swipeBtns = [{
                component: <DeleteJourney  data={data} />,
                backgroundColor: colours.green
            }];
        
            return(
                <Swipeout right={swipeBtns} backgroundColor="transparent">
                    <JourneyContainer>
                        <JourneyPoints>{data.points}</JourneyPoints>
                        <LocationName>{data.destination}</LocationName>
                    </JourneyContainer>
                </Swipeout>
            )
        }

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
                        renderItem={({item}) => <Journey data={item} func={this.deleteJourney} />}
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
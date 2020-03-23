import React from 'react';
import styled from 'styled-components';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import colours from './Colours';
import StartButton from './StartButton';

export default function JourneyStats(props) {
    let {journeyInfo} = props;
    return(
        <Container>
            <Stat>
                <Ionicons name="md-stopwatch" size={22} />
                <ValueContainer>
                    <Value>{journeyInfo.time}</Value>
                    <Scale>{journeyInfo.timeMeasure}</Scale>
                </ValueContainer>
            </Stat>
            <Stat>
                <FontAwesome name="leaf" size={22} />
                <ValueContainer>
                    <Value>{journeyInfo.points}</Value>
                    <Scale>pts</Scale>
                </ValueContainer>
            </Stat>
            <Stat>
                <MaterialCommunityIcons name="periodic-table-co2" size={22} />
                <ValueContainer>
                    <Value>{journeyInfo.co2}</Value>
                    <Scale>kg</Scale>
                </ValueContainer>
            </Stat>

            <StartButton stats={props.journeyInfo} transport={props.transport} />
        </Container>
    );
}

const Container = styled.View`
    flex-direction: row;
    height: 135px;
    width: 100%;
    justify-content: center;
    position: absolute;
    bottom: 2px;
    background-color: ${colours.white};
    border: 1px solid ${colours.green};
`;

const Stat = styled.View`
    flex: 1;
    margin: 2px;
    padding: 20px;
    align-items: center;
`;

const ValueContainer = styled.View`
    flex-direction: row;
    margin: 5px;
    width: 100%;
    justify-content: center;
    flex-wrap: nowrap;
`;

const Value = styled.Text`
    font-weight: 600;
    font-size: 25px;
`;

const Scale = styled.Text`
    font-size: 15px;
    font-weight: 400;
    align-self: flex-end;
`;
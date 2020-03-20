import React from 'react';
import styled from 'styled-components';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import colours from './Colours';

export default function JourneyStats(props) {
    let {journeyInfo} = props;
    return(
        <Container>
            <Stat>
                <Ionicons name="md-stopwatch" size={22} />
                <ValueContainer>
                    <Value>{journeyInfo.time}</Value>
                    <Scale>m</Scale>
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
        </Container>
    );
}

const Container = styled.View`
    flex-direction: row;
    height: 135px;
    width: 100%;
    justify-content: center;
    position: absolute;
    bottom: 130px;
`;

const Stat = styled.View`
    flex: 1;
    background-color: ${colours.white};
    margin: 15px;
    padding: 20px;
    border: 1px solid ${colours.green};
    align-items: center;
`;

const ValueContainer = styled.View`
    flex-direction: row;
    margin: 15px;
    width: 100%;
    justify-content: center;
`;

const Value = styled.Text`
    font-weight: 600;
    font-size: 30px;
`;

const Scale = styled.Text`
    font-size: 15px;
    font-weight: 400;
    align-self: flex-end;
`;
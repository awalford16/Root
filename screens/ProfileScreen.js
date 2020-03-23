import React from 'react';
import styled from 'styled-components';

import TitleBar from '../components/TitleBar';
import colours from '../components/Colours';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export default function ProfileScreen(props) {
    const navigation = useNavigation();
    return(
        <Container>
            <ProfileInfo>
                <FontAwesome name="times" color={colours.grey} size={30} onPress={() => navigation.goBack()} /> 
                <FontAwesome name="user-circle-o" color={colours.green} size={60} />

                <Stats>
                    <UserPoints>
                        <MaterialCommunityIcons name="periodic-table-co2" size={25} color={colours.red} />
                        <Points style={{color: colours.red}}>14</Points>
                    </UserPoints>
                    <UserPoints>
                        <FontAwesome name="leaf" size={25} color={colours.green} />
                        <Points>43</Points>
                    </UserPoints>
                </Stats>
            </ProfileInfo>

            <Settings>

            </Settings>
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    background-color: ${colours.white};
`;

const ProfileInfo = styled.View`
    flex-direction: row;
    width: 100%;
    height: 200px;
    margin-top: 40px;
    justify-content: space-evenly;
    align-items: center;
`;


const Stats = styled.View`
    background-color: black;
`;

const UserPoints = styled.View`
    align-self: center;
    align-items: center;
    flex-direction: row;
`;

const Points = styled.Text`
    margin: 5px;
    color: ${colours.green};
    font-size: 16px;
    font-weight: 600;
    font-style: italic
`;

const Settings = styled.View``;
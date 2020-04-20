import React from 'react';
import colours from './Colours';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import {Text} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Constants from 'expo-constants';

export default function TitleBar(props) {
    const navigation = useNavigation();
    return(
        <Container>
            <Logo source={require('../assets/logo.png')} />
            <UserInfo>
                <Stats onPress={() => props.showModal(!props.modalVisible)}>
                    <UserPoints>
                        <MaterialCommunityIcons name="periodic-table-co2" size={25} color={colours.red} />
                        <Points style={{color: colours.red}}>{(props.userData.co2).toFixed(1)}</Points>
                    </UserPoints>
                    <UserPoints>
                        <FontAwesome name="leaf" size={25} color={colours.green} />
                        <Points>{props.userData.points}</Points>
                    </UserPoints>
                </Stats>
                <Profile onPress={() => navigation.navigate('Modal')}>
                    <ProfileImage source={props.userData.img} />
                </Profile>
            </UserInfo>
        </Container>

    )
}


const Container = styled.View`
    background-color: ${colours.white};
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: ${Constants.statusBarHeight};
`;

const Logo = styled.Image`
    width: 150px;
    height: 45px;
    position: absolute;
    left: 15px;
`;

const Stats = styled.TouchableOpacity`
`;

const UserInfo = styled.View`
    flex-direction: row;
    padding-right: 15px;
    align-items: center;
`;

const UserPoints = styled.View`
    align-self: center;
    align-items: center;
    margin-right: 15px;
    flex-direction: row;
`;

const Points = styled.Text`
    margin: 5px;
    color: ${colours.green};
    font-size: 16px;
    font-weight: 600;
    font-style: italic
`;

const Profile = styled.TouchableOpacity``;

const ProfileImage = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    resize-mode: contain;
`;
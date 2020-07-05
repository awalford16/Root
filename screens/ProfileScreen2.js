import React from 'react';
import styled from 'styled-components';
import {Modal} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import colours from '../components/Colours';

export default function PofileScreen(props) {
    return(
        <Modal visible={props.visible} transparent={true} animationType="fade">
            <Container>
                <CloseButton onPress={() => props.close(false)}>
                    <FontAwesome name='times' size={20} color={colours.grey} />
                </CloseButton>

                <UserInfo>
                    <ProfileImage source={{uri: props.user.img}} />
                    <UserName>{props.user.name}</UserName>
                </UserInfo>

                <Stats>
                    <UserPoints>
                        <FontAwesome name="leaf" size={25} color={colours.green} />
                        <Points>{props.user.points}</Points>
                    </UserPoints>
                    <UserPoints>
                        <MaterialCommunityIcons name="periodic-table-co2" size={25} color={colours.red} />
                        <Points style={{color: colours.red}}>{props.user.co2}</Points>
                    </UserPoints>
                </Stats>

                <Settings>
                    <Setting>
                        <FontAwesome name='car' color={colours.grey} size={32} />
                        <SettingName>Vehicle Type</SettingName>
                    </Setting>

                    <Setting>
                        <FontAwesome name='envelope' color={colours.grey} size={32} />
                        <SettingName>Email Settings</SettingName>
                    </Setting>
                </Settings>

                <Logout onPress={() => console.log('TBC')}>
                    <LogoutText>Sign Out</LogoutText>
                </Logout>
            </Container>
        </Modal>
    );
}

const Container = styled.View`
    flex: 0.6;
    justify-content: center;
    align-items: center;
    background-color: ${colours.white};
    width: 80%;
    align-self: center;
    margin-top: 300px;
    border-radius: 30px;
    border: 4px solid ${colours.green};
`;

const UserInfo = styled.View`
    margin-top: -50px;
    align-items: center;
`;

const ProfileImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 50px;
    resize-mode: contain;
    border: 2px solid ${colours.white};
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    right: 30px;
    top: 20px;
`;

const UserName = styled.Text`
    font-weight: bold;
    font-size: 25px;
    padding: 10px;
`;

const Stats = styled.View`
    flex-direction: row;
    width: 60%;
    justify-content: space-evenly;
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

const Settings = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 15px;
`;

const Setting = styled.View`
    padding: 10px;
    height: 70px;
    justify-content: center;
    align-items: center;
`;

const SettingName = styled.Text`
    font-size: 15px;
    padding: 5px;
`;

const LogoutText = styled.Text`
    color: ${colours.white};
    text-align: center;
    font-weight: bold;
    font-size: 15px;
`;

const Logout = styled.TouchableOpacity`
    background: ${colours.red};
    width: 50%;
    padding: 10px;
    align-self: center;
    margin-top: 30px;
    border-radius: 20px;
    border: 1px solid ${colours.red};
`;
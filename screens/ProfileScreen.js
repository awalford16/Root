import React from 'react';
import styled from 'styled-components';
import {Button, ActivityIndicator} from 'react-native';

import TitleBar from '../components/TitleBar';
import colours from '../components/Colours';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Component } from 'react';
import firebase from '../components/Firebase';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection("users").doc('DbxeQr62SuBFdNnVBLZY');

        this.state = {
            isLoading: true,
            userPoints: 0,
            userCO2: 0,
            uname: "",
            uimg: require('../assets/user-picture.png')
        }
    }

    componentDidMount() {
        this.ref.get().then((doc) => {
            let data = doc.data();

            this.setState({
                isLoading: false,
                userPoints: data.points,
                userCO2: data.co2,
                uname: data.name
            })

        })
    }
    
    render() {
        const {navigation} = this.props;
        return(
            <Container>
                <ProfileInfo>
                    <Wrapper>
                        <FontAwesome name="times-circle" color={colours.grey} size={30} onPress={() => navigation.goBack()} /> 
                    </Wrapper>

                    <Wrapper>
                        <UserImage source={this.state.uimg} />
                        <Button title="Change" />
                    </Wrapper>
    
                    <Wrapper>
                        <Stats>
                            <UserPoints>
                                <MaterialCommunityIcons name="periodic-table-co2" size={25} color={colours.red} />
                                <Points style={{color: colours.red}}>{this.state.userCO2}</Points>
                            </UserPoints>
                            <UserPoints>
                                <FontAwesome name="leaf" size={25} color={colours.green} />
                                <Points>{this.state.userPoints}</Points>
                            </UserPoints>
                        </Stats>
                    </Wrapper>
                </ProfileInfo>
    
                { !this.state.isLoading ? <SettingsWrapper>
                    <Setting>
                        <SettingValue value={this.state.uname} />
                        <SettingName>Username</SettingName>
                    </Setting>

                    <Setting>
                        <SettingValue value="50" keyboardType="numeric" />
                        <SettingName>Car MPG</SettingName>
                    </Setting>
                </SettingsWrapper> : <ActivityIndicator /> }

                <SaveSettings disabled={true}>
                    <Save>Save</Save>
                </SaveSettings>
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    background-color: ${colours.white};
`;

const Wrapper = styled.View`
    width: 80px;
    align-items: center;
`;

const ProfileInfo = styled.View`
    flex-direction: row;
    width: 100%;
    height: 200px;
    margin-top: 40px;
    justify-content: space-evenly;
    align-items: center;
`;

const UserImage = styled.Image`
    width: 65px;
    height: 65px;
    border-radius: 50px;
    resize-mode: contain;
`;

const Stats = styled.View`
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

const SettingsWrapper = styled.View`
    flex: 0.5;
    width: 100%;
    justify-content: space-evenly;
    flex-direction: row;
`;

const Setting = styled.View`
    border: 1px solid ${colours.green};
    width: 40%;
    height: 150px;
    border-radius: 90px;
    align-items: center;
    padding: 20px;
    justify-content: space-evenly;
`;

const SettingValue = styled.TextInput`
    font-size: 20px;
    font-weight: 600;
`;

const SettingName = styled.Text`
    color: ${colours.grey};
    font-style: italic;
    font-size: 15px;
    font-weight: 800;
`;

const SaveSettings = styled.TouchableOpacity`
    position: absolute;
    bottom: 100px;
    align-self: center;
    padding: 10px;
    background-color: ${colours.unselected};
    border-radius: 30px;
    width: 40%;
`;

const Save = styled.Text`
    color: ${colours.white};
    font-size: 20px;
    text-align: center;
`;

import React from 'react';
import styled from 'styled-components';
import {Button, ActivityIndicator, Text, StatusBar} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import TitleBar from '../components/TitleBar';
import colours from '../components/Colours';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Component } from 'react';
import firebase from '../components/Firebase';
import { colors } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection("users").doc('DbxeQr62SuBFdNnVBLZY');

        this.state = {
            isLoading: true,
            userPoints: 0,
            userCO2: 0,
            uname: "",
            uimg: require('../assets/user-picture.png'),
            settingsChanged: false,
            mpg: "35"
        }
    }

    componentDidMount() {
        this.getPermissionsAsync();

        this.ref.get().then((doc) => {
            let data = doc.data();

            this.setState({
                isLoading: false,
                userPoints: data.points,
                userCO2: data.co2,
                uname: data.name,
                uimg: data.image
            })

        });
    }

    getPermissionsAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions for this action.');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
            aspect: [4,3],
            base64: true
        });

        if (!result.cancelled) {
            let selectedImage = `data:image/jpg;base64,${result.base64}`;
            this.setState({
                uimg: {uri: selectedImage},
                settingsChanged: true
            })
        }
    }

    updateSetting = (type, val) => {
        this.setState({
            [type]: val,
            settingsChanged: true
        });
    }

    _saveChages = () => {
        this.setState({
            isLoading: true
        })

        this.ref.update({
            name: this.state.uname,
            image: this.state.uimg,
            mpg: this.state.mpg
        }).then((doc) => {
            this.setState({
                isLoading: false,
                settingsChanged: false
            })
        }).catch((error) => {
            console.log("Error updating profile: ", error);
            this.setState({
                isLoading: false
            })
        })
    }
    
    render() {
        const {navigation} = this.props;
        return(
            <Container>
                <StatusBar    
                    hidden = {false}
                    backgroundColor={colours.green}
                    barStyle='light-content'
                /> 
                <ProfileInfo>
                    <Wrapper>
                        <FontAwesome name="times-circle" color={colours.white} size={30} onPress={() => navigation.goBack()} /> 
                    </Wrapper>

                    <Wrapper>
                        <UserImage source={this.state.uimg} />
                        <ChangeImage title="Change" onPress={() => this._pickImage()}>
                            <Text>Change</Text>
                        </ChangeImage>
                    </Wrapper>
    
                    <Wrapper>
                        <Stats>
                            <UserPoints>
                                <MaterialCommunityIcons name="periodic-table-co2" size={25} color={colours.white} />
                                <Points>{this.state.userCO2}</Points>
                            </UserPoints>
                            <UserPoints>
                                <FontAwesome name="leaf" size={25} color={colours.white} />
                                <Points>{this.state.userPoints}</Points>
                            </UserPoints>
                        </Stats>
                    </Wrapper>
                </ProfileInfo>
    
                { !this.state.isLoading ? <SettingsWrapper>
                    <Setting>
                        <SettingName>Username</SettingName>
                        <SettingValue value={this.state.uname} 
                            onChangeText={value => this.updateSetting('uname', value)}  />
                    </Setting>

                    <Setting>
                        <SettingName>Car Settings</SettingName>
                    </Setting>

                    <CarSettings>
                        <Setting>
                            <SettingValue value={this.state.mpg} keyboardType="numeric" 
                                onChangeText={value => this.updateSetting('mpg', value)} />
                            <SettingName>MPG</SettingName>
                        </Setting>
                        
                        <Setting>
                            <MaterialCommunityIcons style={{alignSelf: 'center'}} name="fuel" size={32} color={colours.white} />
                            <SettingName>Type</SettingName>
                        </Setting>
                    </CarSettings>
                    
                </SettingsWrapper> : <ActivityIndicator /> }
                        
                <SaveSettings disabled={!this.state.settingsChanged} onPress={() => this._saveChages()}>
                    <Save>Save</Save>
                </SaveSettings>
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    background-color: ${colours.green};
`;

const Wrapper = styled.View`
    width: 80px;
    align-items: center;
`;

const ProfileInfo = styled.View`
    flex-direction: row;
    width: 100%;
    height: 150px;
    margin-top: 40px;
    justify-content: space-evenly;
    align-items: center;
`;

const UserImage = styled.Image`
    width: 75px;
    height: 75px;
    border-radius: 50px;
    resize-mode: contain;
`;

const ChangeImage = styled.TouchableOpacity`
    background-color: ${colours.white};
    position: relative;
    top: -15px;
    width: 80%;
    align-items: center;
    height: 20px;
    opacity: 0.8;
    border-radius: 40px;
    justify-content: center;
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
    color: ${colours.white};
    font-size: 16px;
    font-weight: 600;
    font-style: italic
`;

const SettingsWrapper = styled.View`
    flex: 0.5;
    width: 100%;
    justify-content: space-evenly;
    margin-top: 20px;
`;

const Setting = styled.View`
    height: 150px;
    border-radius: 90px;
    padding: 20px;
    justify-content: space-evenly;
`;

const CarSettings = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    align-self: center;
    align-items: flex-start;
    position: relative;
    top: -20px;
`;

const SettingValue = styled.TextInput`
    font-size: 30px;
    font-weight: 600;
    font-style: italic;
    align-self: center;
    color: ${colours.white};
`;

const SettingName = styled.Text`
    color: ${colours.unselected};
    font-size: 15px;
    font-weight: 800;
`;

const SaveSettings = styled.TouchableOpacity`
    position: absolute;
    bottom: 50px;
    align-self: center;
    height: ${props => props.disabled ? 0 : 40};
    background-color: ${colours.white};
    border-radius: 30px;
    width: 40%;
    justify-content: center;
`;

const Save = styled.Text`
    color: ${colours.green};
    font-size: 20px;
    text-align: center;
`;

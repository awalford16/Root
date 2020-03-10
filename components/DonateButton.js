import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import colours from './Colours.js';
import { useNavigation } from '@react-navigation/native';

export default function DonateButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{ position:'absolute', bottom: 20, left: 5 }} onPress={() => navigation.navigate("Donate")}>
            <DonateText>
                
                <Icon name="handshake-o" size={40} color={colours.green} />
            </DonateText>
        </TouchableOpacity>
    )
}

const DonateText = styled.Text`
    color: ${colours.green};
    border-radius: 30px;
    margin: 20px;
    font-weight: 700;
    font-size: 25px;
    padding: 15px;
    align-self: flex-start;
}`;
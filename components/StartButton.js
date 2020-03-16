import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import colours from './Colours';

export default function StartButton(props) {
    const navigation = useNavigation();
    return(
        <GoButton style={{ position:'absolute', bottom: 20, right: 5, backgroundColor: !props.journeyReady ? colours.background : colours.green }} 
            disabled={!props.journeyReady} 
            onPress={() => navigation.navigate('Journey')}
        >
            { props.journeyReady ? <GoText>START</GoText> : null }
            <Icon name="arrow-circle-right" size={55} 
                color={props.journeyReady ? colours.white : colours.grey} 
                style={{alignSelf: 'center', padding: 3 }} 
            />
        </GoButton>
    )
}

const GoButton = styled.TouchableOpacity`
    margin: 20px;
    flex-direction: row;
    border-radius: 30px;
`;

const GoText = styled.Text`
    color: ${colours.white};
    align-self: center;
    padding: 15px;
    font-size: 25px;
`;
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import colours from './Colours';

export default function StartButton(props) {
    const navigation = useNavigation();
    return(
        <GoButton
            onPress={() => navigation.navigate('Journey', { stats: props.stats, transport: props.transport })}
        >
            <Icon name="arrow-circle-right" size={60} 
                color={colours.green} 
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
import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/core';

export default function Shannon() {
    const navigation = useNavigation();
    return(
        <ShannonButton title="Flower" onPress={() => navigation.goBack()} />
    );
}


const ShannonButton = styled.Button`
    color: purple;
`;
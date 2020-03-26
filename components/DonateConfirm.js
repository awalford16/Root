import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components';
import colours from './Colours';

export default function DonateConfirm(props) {
    return(
        <Container>
            <Title>Thank You!</Title>
            <ConfirmText style={{fontStyle: 'italic'}}>Your donations mean a great deal so keep on walking!</ConfirmText>
            <ConfirmText>Donation Amount: £{props.donateInfo.amount}</ConfirmText>
            <ConfirmText>Charity: {props.donateInfo.charity}</ConfirmText>
            <ConfirmText>Points Remaining: {props.remaining}</ConfirmText>
            <FontAwesome 
                style={{position: 'absolute', bottom: -40, right: 20}}
                onPress={() => props.toggleView(false)} 
                name="check-circle" size={60} color={colours.white} />
        </Container>
    );
}

const Container = styled.View`
    flex: 0.8;
    padding: 10px;
    width: 90%;
    align-self: center;
    margin-top: 20px;
`;

const Title = styled.Text`
    font-weight: 600;
    font-size: 40px;
    align-self: center;
    color: ${colours.white};
    margin-bottom: 15px;
`;

const ConfirmText = styled.Text`
    color: ${colours.white};
    font-size: 18px;
    margin: 10px;
    font-weight: 300;
`;
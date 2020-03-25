import React from 'react';
import styled from 'styled-components';
import { Keyboard, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import DonateScreen from './DonateScreen';
import colours from '../components/Colours';
import ModalBar from '../components/ModalBar';

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback style={{'flex': 1}} onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default function ModalScreen(props) {
    return(
        <GestureRecognizer onSwipeDown={() => props.showModal(false)}>
            <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
                <DismissKeyboard>
                    <Container>
                        <ModalBar hideModal={props.showModal} />
                        <DonateScreen userData={props.userData} />
                    </Container>
                </DismissKeyboard>
            </Modal>
        </GestureRecognizer>
    );
}

const Container = styled.View`
    background-color: ${colours.green};
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 500px;
    align-self: center;
`;
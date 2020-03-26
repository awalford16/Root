import React, {Component} from 'react';
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

export default class ModalScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 1
        }
    }

    changeView = (view) => {
        this.setState({view: view})
    }

    render() {
        return(
            <GestureRecognizer onSwipeDown={() => this.props.showModal(false)}>
                <Modal animationType="slide" transparent={true} visible={this.props.modalVisible}>
                    <DismissKeyboard>
                        <Container>
                            <ModalBar hideModal={this.props.showModal} selectView={this.changeView} openView={this.state.view} />
                            {this.state.view == 1 && <DonateScreen userData={this.props.userData} />}
                        </Container>
                    </DismissKeyboard>
                </Modal>
            </GestureRecognizer>
        );
    } 
}

const Container = styled.View`
    background-color: ${colours.green};
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 500px;
    align-self: center;
`;
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import colours from './Colours';

class LocationItem extends PureComponent {
    render() {
        return(
            <Container>
                <Place>{this.props.description}</Place>
            </Container>
        );
    }
}

export default LocationItem;

const Container = styled.View`
    flex: 0.2;
    padding: 12px;
    border-bottom-width: 1px;
    border-bottom-color: ${colours.grey}
`;

const Place = styled.Text`
    font-size: 16px;
`;
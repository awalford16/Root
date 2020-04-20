import React, { PureComponent } from 'react';
import styled from 'styled-components';

import colours from '../Colours';

class LocationItem extends PureComponent {
    _handlePress = async() => {
        const res = await this.props.fetchDetails(this.props.place_id);

        let {lat, lng} = res.geometry.location;
        let name = res.name;

        this.props.setDestination(name, lat, lng);
        this.props.hideList();
    }

    render() {
        return(
            <Container onPress={this._handlePress}>
                <Place>{this.props.description}</Place>
            </Container>
        );
    }
}

export default LocationItem;

const Container = styled.TouchableOpacity`
    flex: 0.2;
    padding: 12px;
    border-bottom-width: 1px;
    border-bottom-color: ${colours.grey}
`;

const Place = styled.Text`
    font-size: 12px;
`;
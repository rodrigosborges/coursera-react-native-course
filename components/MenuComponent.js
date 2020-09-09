import React, { useState, useEffect} from 'react'
import { View, FlatList, Text } from 'react-native'
import { Tile } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux'
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

function Menu(props) {

    const renderMenuItem = ({item, index}) => (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
            <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                imageSrc={{ uri: baseUrl+item.image }}
                onPress={() => props.navigation.navigate('Dishdetail', {dishId: item.id})}
            />
        </Animatable.View>
    )

    if (props.dishes.isLoading) {
        return(
            <Loading />
        );
    }
    else if (props.dishes.errMess) {
        return(
            <View>            
                <Text>{props.dishes.errMess}</Text>
            </View>            
        );
    }
    else {

        return (
            <FlatList 
                data={props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }

}


export default connect(mapStateToProps)(Menu)
import React, { useState, useEffect} from 'react'
import { Text, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        promotions: state.promotions,
        dishes: state.dishes,
        leaders: state.leaders
    }
}

function RenderItem(props){
    const item = props.item

    if (props.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View> 
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    else {
        if(item != null){
            return (
                <Card
                    featuredTitle={item.name}
                    featuredSubTitle={item.designation}
                    image={require(`./images/uthappizza.png`)}
                    >
                    <Text style={{margin:10}}>
                        {item.description}
                    </Text>
                </Card>
            )
        }

        else{
            return (<View></View>)
        }
    }
}

function Home(props) {

    const animatedValue = new Animated.Value(0)

    useEffect(() => {
        animate()
    }, [])

    animate = () => {
        animatedValue.setValue(0)
        Animated.timing(
          animatedValue,
          {
            toValue: 8,
            duration: 8000,
            easing: Easing.linear
          }
        ).start(() => animate())
    }

    const xpos1 = animatedValue.interpolate({
        inputRange: [0, 1, 3, 5, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos2 = animatedValue.interpolate({
        inputRange: [0, 2, 4, 6, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos3 = animatedValue.interpolate({
        inputRange: [0, 3, 5, 7, 8],
        outputRange: [1200, 600, 0, -600, -1200 ]
    })

    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}]}}>
                <RenderItem item={props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={props.dishes.isLoading}
                    erreMess={props.dishes.erreMess} 
                    />
            </Animated.View>
            <Animated.View style={{ width: '100%',  transform: [{translateX: xpos2}]}}>
                <RenderItem item={props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={props.promotions.isLoading}
                    erreMess={props.promotions.erreMess} 
                    />
            </Animated.View>
            <Animated.View style={{ width: '100%',  transform: [{translateX: xpos3}]}}>
                <RenderItem item={props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={props.leaders.isLoading}
                    erreMess={props.leaders.erreMess} 
                    />
            </Animated.View>
        </View>
    );

}

export default connect(mapStateToProps)(Home)
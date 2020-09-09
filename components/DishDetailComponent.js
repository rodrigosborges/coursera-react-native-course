import React, { useState, useRef } from 'react'
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native'
import { Card, Icon, Rating, Input } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux'
import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish

    const viewRef = useRef(null);

    const dragLeft = ({ moveX, moveY, dx, dy }) => {
        return dx < -200
    }

    const dragRight = ({ moveX, moveY, dx, dy }) => {
        return dx > -200
    }

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            viewRef.current.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))  
        },      
        onPanResponderEnd: (e, gestureState) => {

            if (dragLeft(gestureState)){

                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress(dish.id)}},
                    ],
                    { cancelable: false }
                );

            }else if(dragRight(gestureState)){
                props.onPressEdit(true)
            }

            return true;
        }
    })

    if(dish != null){

        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} 
                ref={viewRef}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}
                >
                    <Text style={{margin:10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.formRow}>
                        <Icon  
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress(dish.id)}
                            />
                        <Icon  
                            raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            color='#4343b3'
                            onPress={() => props.onPressEdit(true)}
                            />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                    </View>
                </Card>
            </Animatable.View>
        )

    }else{
        return (<View></View>)
    }

}

const RenderComments = (props) => {
    const comments = props.comments

    const renderCommentItem = ({item, index}) => (
        <View key={index} style={{margin:10}}>
            <Text style={{fontSize: 14}}>{item.comment}</Text>
            <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
            <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
        </View>
    )

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    )
}

function DishDetail(props){

    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(3)
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const dishId = props.route.params.dishId

    const resetForm = () => {
    }

    const addFavorite = (dishId) => {
        props.postFavorite(dishId)
    }

    const storeComment = () => {
        props.postComment(dishId, rating, author, comment)
        setShowModal(false)
    }

    return(
        <ScrollView>

            <Modal animationType = {"slide"} transparent = {false}
                visible = {showModal}>
                <View style = {styles.modal}>

                    <Rating
                        showRating
                        defaultRating={rating}
                        onFinishRating={rating => setRating(rating)}
                        style={{ paddingVertical: 10 }}
                    />

                    <Input
                        placeholder='Author'
                        leftIcon={
                            <Icon
                            name='person'
                            size={24}
                            color='black'
                            />
                        }
                        onChangeText={value => setAuthor(value)}
                        />


                    <Input
                        placeholder='Comment'
                        leftIcon={
                            <Icon
                            name='comment'
                            size={24}
                            color='black'
                            />
                        }
                        onChangeText={value => setComment(value)}
                        />
                    
                    <Button 
                        onPress = {() =>{storeComment()}}
                        color="#512da8"
                        title="SUBMIT" 
                        />
                    <Button 
                        onPress = {() =>{setShowModal(false)}}
                        color="#999999"
                        title="CANCEL" 
                        />
                </View>
            </Modal>

            <RenderDish 
                favorite={props.favorites.some(el => el == dishId)} 
                onPress={addFavorite}
                onPressEdit={setShowModal}
                dish={props.dishes.dishes.find(dish => dish.id == dishId)} 
            />

            <RenderComments comments={props.comments.comments.filter(comment => comment.dishId == dishId)}/>
        
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
        marginTop: 50
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)
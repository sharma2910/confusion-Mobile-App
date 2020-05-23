import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { Rating, Input } from 'react-native-elements';
import moment from 'moment';
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
    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200)
            return true;
        else {
            return false
        }
    }

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if (dx > 200)
            return true;
        else {
            return false
        }
    }

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ' ' + message + ' ' + url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        })
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites',
                    'Are you sure you wish to add ' + dish.name + 'to your favorites',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already fav') : props.onPressFav()
                        }
                    ],
                    { cancelable: false }
                )
            else if (recognizeComment(gestureState))
                props.onPressComment()
            return true
        }
    });

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={1000} delay={500}
                {...panResponder.panHandlers}>

                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{ margin: 10 }}>{dish.description}</Text>
                    <View row style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already fav') : props.onPressFav()}
                        />
                        <Icon
                            raised
                            reverse
                            name="pencil"
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.onPressComment()}
                        />
                        <Icon
                            raised
                            reverse
                            name="share"
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (
            <View></View>
        );
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItems = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating imageSize={15} readonly startingValue={item.rating} style={styles.rating} />
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + moment(item.date).format("MMM DD at HH:mm a")}</Text>
            </View>
        );
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItems}
                    keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            comment: "",
            author: "",
            rating: 3
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    markFavorite(dishid) {
        this.props.postFavorite(dishid);
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    onSubmitComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleModal()
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPressFav={() => this.markFavorite(dishId)}
                    onPressComment={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Rating showRating fractions={1} startingValue={this.state.rating} onFinishRating={(rating) => this.setState({ rating: rating })} />
                        <Input
                            style={{ marginBottom: 20 }}
                            placeholder='Author'
                            leftIcon={
                                <Icon
                                    containerStyle={{ marginEnd: 5 }}
                                    name='user-o'
                                    type='font-awesome'
                                    size={22}
                                    color='black'
                                />
                            }
                            onChangeText={(value) => this.setState({ author: value })}
                        />
                        <Input
                            style={{ marginBottom: 10 }}
                            placeholder='Comment'
                            leftIcon={
                                <Icon
                                    containerStyle={{ marginEnd: 5 }}
                                    name='comment-o'
                                    type='font-awesome'
                                    size={22}
                                    color='black'
                                />
                            }
                            onChangeText={(value) => this.setState({ comment: value })}
                        />
                        <View style={{ marginTop: 25 }}>
                            <Button
                                color="#512DA8"
                                title="Submit"
                                onPress={() => this.onSubmitComment(dishId)}
                            />
                        </View>
                        <View style={{ marginTop: 25 }}>
                            <Button
                                title="Close"
                                onPress={() => this.toggleModal()}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
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
        margin: 20
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
    },
    rating: {
        flexDirection: "row"
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
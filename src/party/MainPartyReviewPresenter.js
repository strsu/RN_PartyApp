import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Rating, AirbnbRating } from 'react-native-ratings';
import useStore from '../../AppContext';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainPartyReviewPresenter(props) {
    console.log('@MainPartyReviewPresenter');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}>
                <ImageInfo props={props} />
                <Rate props={props} />
                <Review props={props} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default MainPartyReviewPresenter;

const ImageInfo = ({ props }) => {
    return (
        <View style={{
            flex: 1,
            height: parseInt(windowHeight / 4),
            marginBottom: 20,
        }}>
            <Image
                style={{
                    flex: 1,
                    //width: windowWidth,
                    resizeMode: 'cover',
                }}
                blurRadius={5}
                source={{ uri: useStore.getState().picURL + props.state.images[0] }}
            />
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
            }}>

                <Text
                    style={{
                        color: 'white',
                        fontSize: 17,
                        fontWeight: 'bold',
                    }}
                >{props.state.AttendTime}@</Text>
            </View>
        </View>
    );
}

const Rate = ({ props }) => {
    return (
        <View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginBottom: 5,
                }}>파티 시설 및 인테리어는 어떠셨나요?</Text>

                <Text style={{
                    fontSize: 14,
                    fontWeight: '400',
                    marginBottom: 5,
                }}>{props.state.airbnb[props.state.starCount-1]}</Text>
            </View>

            <Rating
                type='star'
                ratingCount={5}
                startingValue={5}
                imageSize={40}
                jumpValue={0.5}
                //showRating
                //fractions={5}
                onFinishRating={props.state.onStarRatingPress}
            />
        </View>
    );
}

const Review = ({props}) => {
    return(
        <View style={{
            padding: 5,
            margin: 10,
        }}>
            <Text>리뷰작성</Text>
            <View style={{
                height: parseInt(windowHeight / 3),
                borderWidth: 1,
                borderColor: 40,
                marginTop: 5,
                padding: 10,
                borderRadius: 5,
            }}>
                <TextInput
                    multiline
                    numberOfLines={10}
                    textAlignVertical='top'
                    value={props.state.text}
                    onChangeText={(text) => props.state.onTextChange(text)}
                    returnKeyType='next'
                    placeholder={'1. 다른 사람에게 도움이 되는 리뷰를 작성해 주세요.\n2. 우수 리뷰는 추첨을 통해 포인트를 드립니다.'}
                />
                <Text style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                }}>{props.state.text.length}자</Text>
            </View>

            <TouchableOpacity style={{
                flex: 1,
                marginTop: 20,
                height: 70,
                width: 70,
                borderWidth: 1,
                borderColor: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
            }}
            onPress={() => props.state.openGallery()}
            >
                {
                    props.state.userImg == '' ?
                    <Icon name='image' size={20}/> :
                    <Image
                        style={{
                            flex: 1,
                            height: 70,
                            width: 70,
                            borderRadius: 5,
                            resizeMode: 'cover'
                        }}
                        source={{uri: 'data:image/jpeg;base64,' + props.state.userImg}}
                    />

                }
                
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
    },
});
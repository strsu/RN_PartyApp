import React, {useState} from 'react';
import {
    SafeAreaView,
    FlatList,
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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainPartyReviewPresenter(props) {
    console.log('@MainPartyReviewPresenter');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <Rate props={props}/>
            </View>
        </SafeAreaView>
    );
}

export default MainPartyReviewPresenter;

const Rate = ({props}) => {
    return(
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
            </View>

            <Rating
                type='star'
                ratingCount={5}
                startingValue={5}
                imageSize={40}
                jumpValue={0.5}
                //showRating
                fractions={1}
                onFinishRating={props.state.onStarRatingPress}
                />
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
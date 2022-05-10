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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Presenter(props) {
    console.log('@BoardDetailPresenter');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
            </View>
        </SafeAreaView>
    );
}

export default Presenter;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
    },
});
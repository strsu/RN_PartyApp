import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    BackHandler,
    ToastAndroid,
    Dimensions,
    RefreshControl
}
from 'react-native';

import Icon from 'react-native-vector-icons/Octicons';

import useStore  from '../../../../AppContext';
import {getData} from "../../../../API/crud";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function PartyScreen_Add({navigation, route}) {
    console.log('@PartyScreen_Add');

    return (
        <SafeAreaView style={styles.container}>
        </SafeAreaView>
    );
}

export default PartyScreen_Add;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    main: {
        flex: 1,
    },

  });
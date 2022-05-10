import React, {useState, useEffect, useRef } from 'react';
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
    Animated,
    TouchableWithoutFeedback
}
from 'react-native'

import {getData}    from "../../../../API/crud";
import GlobalStyles from "../../globalStyles";
import {Header, Footer} from '../../Bar';

function PartyScreen_SubWriting({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={GlobalStyles.Header}>
                <Text style={styles.headerTitle}>울림</Text>
            </View>
            <View style={styles.main}>
                <Text>{state}</Text>
            </View>
            {/*<Footer navigation={navigation} />*/}
        </SafeAreaView>
    );
}

export default PartyScreen_SubWriting;
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
    Button
}
from 'react-native'

import {getData} from "../../API/crud";
import {Header, Footer} from '../Bar';

import useStore from '../../../AppContext';

const User = (id) => {
    const uuid = ['273EB135AA7B11EC951F028A583A66B2',
                    '34C77393AA7B11EC951F028A583A66B2',
                    '395393C5AA7B11EC951F028A583A66B2',
                    '3E347E74AA7B11EC951F028A583A66B2',
                    '42C5E772AA7B11EC951F028A583A66B2',
                    '47BF76B0AA7B11EC951F028A583A66B2',
                    '4C862BF8AA7B11EC951F028A583A66B2',
                    '50E2DBFEAA7B11EC951F028A583A66B2',
                    '5522D96FAA7B11EC951F028A583A66B2',
                    '5A927093AA7B11EC951F028A583A66B2']
    const sex = ['0','0','0','0','0','1','1','1','1','1']
    useStore.getState().setUUID(uuid[id]);
    useStore.getState().setSEX(sex[id])

    console.log(useStore.getState().uuid);
}

function RecommandScreen({navigation}) {
    const [dataSource, setDataSource] = useState([]);
    const [text, setText] = useState('');
    let url = "http://192.168.1.243:4000/mainImage";

    let headerParams = {
        'navigation' : {navigation},
        'sort' : 1,
        'title' : '추천'
    }

    return (
        <SafeAreaView style={styles.container}>
            {/*<Header headerParams={headerParams}/>*/}
            <View style={styles.main}>
                <Button
                    title='회원 1 - 남자'
                    onPress={() => User(1)}
                />
                <Button
                    title='회원 2 - 남자'
                    onPress={() => User(2)}
                />
                <Button
                    title='회원 3 - 남자'
                    onPress={() => User(3)}
                />
                <Button
                    title='회원 4 - 남자'
                    onPress={() => User(4)}
                />
                <Button
                    title='회원 5 - 남자'
                    onPress={() => User(5)}
                />
                <Button
                    title='회원 6 - 여자'
                    onPress={() => User(6)}
                />
                <Button
                    title='회원 7 - 여자'
                    onPress={() => User(7)}
                />
                <Button
                    title='회원 8 - 여자'
                    onPress={() => User(8)}
                />
                <Button
                    title='회원 9 - 여자'
                    onPress={() => User(9)}
                />
                <Button
                    title='회원 10 - 여자'
                    onPress={() => User(10)}
                />
            </View>
            {/*<Footer navigation={navigation} />*/}
        </SafeAreaView>
    );
}

export default RecommandScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    main: {
        flex: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        backgroundColor: '#ebb728',
    },
    bar: {
        flex: 1,
        flexDirection: "row",
        marginTop: 5,
        backgroundColor: '#faf9f5',
    },
    barBtn: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });
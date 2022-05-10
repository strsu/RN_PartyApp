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
from 'react-native';

import useStore from '../../../../AppContext';

import {getData}    from "../../../../API/crud";
import GlobalStyles from "../../globalStyles";
import {Header, Footer} from '../../Bar';


function PartyScreen_MainShow({navigation}) {
    const [dataSource, setDataSource] = useState([]);
    const [text, setText] = useState('');
    let url = "http://192.168.1.243:4000/mainImage";

    /*const user = React.useContext(AppContext);
    
    useEffect(() => {
        user.setdisplayName('MainShow');
    }, []);*/

    const setHideTabBar = useStore(state => state.setHideTabBar);

    React.useLayoutEffect(() => {
        console.log('@PartyScreen_MainShow - useLayoutEffect');
        // 부모 속성을 가져온 다음에 옵션으로 bar를 안 보이게 처리해야 한다.
        setHideTabBar(true);
        navigation.getParent().getParent().setOptions({
            tabBarStyle: { display: "none" }, //이건 탭을 삭제
            //tabStyle: { display: 'none', height: 0},
        });

    }, []);


    return (
        <SafeAreaView style={styles.container}>
            {/*<Header headerParams={headerParams}/>*/}
            <View style={styles.main}>
                <Text
                    style={{fontSize: 50 }}
                >
                    공사중</Text>
                <Image
                    style={{width: 200, height:200, }}
                    //source={require('./icon/Under_Construction.png')}
                    source={require('../../../icon/Under_Construction.png')}
                />
            </View>
            {/*<Footer navigation={navigation} />*/}
        </SafeAreaView>
    );
}

export default PartyScreen_MainShow;

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
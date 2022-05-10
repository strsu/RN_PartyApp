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
    Animated,
    TouchableWithoutFeedback,
    Dimensions
}
from 'react-native'

import {getData}    from "../../../../API/crud";
import GlobalStyles from "../../globalStyles";
import {Header, Footer} from '../../Bar';

import Icon from 'react-native-vector-icons/Octicons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const boardCard = ({navigation, item}) => {
    // 여기서 if로 boardCard 구분 가능
    item = item["item"];
    return (
        <View
            style={{
                flex: 1,
                //width: "32%",
                flexDirection: 'column',
                margin: 3,
                marginBottom: 10,
                //backgroundColor: 'red',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
            }}>
            
            <TouchableOpacity
                style={styles.touchArea}
                onPress={() => Alert.alert(item.id)}
            >
                <Image
                    style={styles.imageThumbnail}
                    source={{uri: item[1]}}
                />
                <View style={{

                }}>
                    <Text 
                    numberOfLines={1}
                    style={{
                            fontSize: 12,
                            fontWeight: '700',
                            marginBottom: -5,
                            
                        }}>{"우리집 고양이 츄르를 좋아해"+item[0]}</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon name="dot-fill" size={15} color="#BAE7AF" />
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 13,
                            marginBottom: 2,
                        }}>{"2:2"}</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        </View>
    );
};

const filterCard = (item) => {
    return (
        <View
            style={{
                //flex: 1,
                //width: parseInt(windowWidth/7),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 4,
                marginRight: 10,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 15,
                marginBottom: 15,

            }}>
            
            <TouchableOpacity
                style={styles.touchArea}
                onPress={() => Alert.alert(item.id)}
            >
                <Text style={{
                    fontSize: 13,
                }}>{item["item"]}</Text>
            </TouchableOpacity>
        </View>
    );
}

const flatListHeader = (filter) => {
    return (
        <View style={styles.profileArea}>

            <View style={styles.profileBtm}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        //backgroundColor: 'blue',
                    }}
                    horizontal={true}
                    data={filter}
                    //numColumns={filter.length}
                    renderItem={item => filterCard(item)}
                />
            </View>

            <View style={styles.profileTop}>
                <View style={styles.myProfileMy}>
                    <TouchableOpacity>
                        <Image style={styles.myProfileMyImg} />
                    </TouchableOpacity>
                </View>
                <View style={styles.myProfileCreate}>
                    <TouchableOpacity>
                        <Image style={styles.myProfileCreateImg} />
                    </TouchableOpacity>
                </View>
            </View>

            
        </View>
    );
}

function PartyScreen_Sub({navigation}) {
    console.log('@PartyScreen_Sub');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState([
        '1:1',
        '2:2',
        '3:3',
        '오늘 볼 사람',
        '주말에 만나자',
        '맥주 한잔?',
        '심심해요',
        '아무거나',
        '우리집 고양이 돼지야',
    ]);
    let url = "http://192.168.1.243:4000/subParty/subParty";

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const newDatas = await getData(url);
                if(newDatas == 404 || newDatas == 500) {
                    setLoading(true);
                    setTimeout(fetchBoard, 500);
                } else {
                    setData((d) => {
                        setLoading(false);
                        setData(newDatas);
                    });
                }
            } catch (e) {
                console.log('ERROR!!, ', e);
                setTimeout(fetchBoard, 500);
            }
        };

        fetchBoard();
    }, [loading]);

    let headerParams = {
        'navigation' : {navigation},
        'sort' : 0,
        'title' : 'sub'
    }
    

    return (
        <SafeAreaView style={styles.container}>
            {/*<Header headerParams={headerParams}/>*/}
            <View style={styles.main}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={flatListHeader(filter)}
                    //inverted
                    //onEndReached={loadMoreOlderData}
                    numColumns={3}
                    //keyExtractor={(item, index) => index}
                    renderItem={item => boardCard({navigation, item})}
                />

            </View>
            {/*<Footer navigation={navigation} />*/}
        </SafeAreaView>
    );
}

export default PartyScreen_Sub;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    main: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    header: {
        flex: 1,
        backgroundColor: '#ebb728',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerBtn: {
        fontSize: 20,
        color: "#d4d6d5",
        fontWeight: '700',
        letterSpacing: 1,
        paddingLeft: 8,
    },
    headerSelected: {
        fontSize: 20,
        color: "black",
        fontWeight: '700',
        letterSpacing: 1,
        paddingLeft: 5,
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
    touchArea: {
        borderRadius: 10,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: parseInt(windowHeight/6.7),
      width: parseInt(windowHeight/6.7),
      borderRadius: 5,
      resizeMode: 'cover',
    },
    profileArea: {
        height: parseInt(windowHeight/4),
        //backgroundColor: 'gray',
    },
    profileTop: {
        height: "65%",
        flexDirection: 'row',
        //backgroundColor: 'red',
    },
    profileBtm: {
        height: "35%",
        //backgroundColor: 'blue',
    },
    myProfileMy: {
        position: 'relative',
        width: "40%",
        //backgroundColor: 'red',
        justifyContent: 'center',
        //alignItems: 'baseline',
    },
    myProfileMyImg: {
        
        height: parseInt(windowHeight/9),
        width: parseInt(windowHeight/9),
        marginLeft: 40,
        borderRadius: 100,
        //backgroundColor: 'green',
    },
    myProfileCreate: {
        width: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'black',
    },
    myProfileCreateImg: {
        height: parseInt(windowHeight/20),
        width: parseInt(windowHeight/5),
        borderRadius: 10,
        //backgroundColor: 'green',
    },






    floating: {
        position: 'absolute',
        bottom: 140,
        right: 75,
        backgroundColor: 'blue',
    },
    floatingBtn: {
        position: 'absolute',
        //right: 20,
        borderRadius: 100,
        aligncontent: "center",
        justifyContent: "center",
        shadowRadius: 100,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: {height: 10}
    },
    floatingImg: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        width: 60,
        height: 60,
        //backgroundColor: "#F02A4B"
    },
    myParty: {
        width: 48,
        height: 48,
        marginLeft: 6,
    },
    partyCreate: {
        width: 48,
        height: 48,
        marginLeft: 6,
    },
    addedParty: {
        width: 48,
        height: 48,
        marginLeft: 6,
    }
  });



  /*
    const animation = useRef(new Animated.Value(0)).current; //new Animated.Value(0);
    let open = 0;

    const toggleMenu = () => {
        const toValue = open ? 0 : 1;

        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: false
        }).start();
        
        open = !open;
    };

    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })
            }
        ]
    };

    const myParty = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -180]
                })
            }
        ]
    };

    const partyCreate = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120]
                })
            }
        ]
    };

    const addedParty = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60]
                })
            }
        ]
    };

    const opacity = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1]
    });
    */

    /*<View style={styles.floating}>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floatingBtn, styles.myParty, myParty, opacity]}>
                        <TouchableOpacity>
                            <Image
                                style={[styles.floatingImg, {width: 48, height:48}]}
                                source={require('./icon/1.png')}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floatingBtn, styles.partyCreate, partyCreate, opacity]}>
                        <TouchableOpacity>
                            <Image
                                style={[styles.floatingImg, {width: 48, height:48}]}
                                source={require('./icon/2.png')}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floatingBtn, styles.addedParty, addedParty, opacity]}>
                        <TouchableOpacity>
                            <Image
                                style={[styles.floatingImg, {width: 48, height:48}]}
                                source={require('./icon/3.png')}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floatingBtn, styles.menu, rotation]}>
                        <TouchableOpacity onPress={toggleMenu}>
                            <Image
                                style={[styles.floatingImg, {width: 55, height:55}]}
                                source={require('./icon/4.png')}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>*/
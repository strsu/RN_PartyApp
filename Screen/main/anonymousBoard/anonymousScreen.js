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
    TouchableWithoutFeedback,
    Dimensions
}
from 'react-native'

import { QueryClient, useQuery } from 'react-query'
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';

import {getData} from "../../../API/crud";
import { getCurTime, timeCompare } from '../../util/getCurTime';
import { useAnony } from '../../../AppContext';

import { baseURL } from '../../../database';

// set 함수를 통해서만 상태를 변경할 수 있다


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const queryClient = new QueryClient();

const boardCard = ({navigation, item, curFilter}) => {
    // 여기서 if로 boardCard 구분 가능
    item = item["item"];

    if(curFilter != '종합' && curFilter != item["type"]) {
        return (<></>)
    }

    return (
        <View style={styles.line}>
            <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('라운지2', {paramKey: item })}
            >
                {/* 왼쪽 */}
                <View style={{ width: "75%", marginLeft: 10,}}>

                    <View style={styles.lineTop}>
                        <Text style={{
                            marginTop: 10,
                            fontWeight: "700",
                            fontSize: 15,

                        }}>{item["title"]}</Text>    
                    </View>
                    
                    <View style={styles.lineMid}>
                        <Text style={{
                            marginRight: 10,
                            color: '#b6bab7',
                            fontSize: 12,
                        }}>{item["type"]}</Text>
                        <Icon style={styles.lineBtmIcon} name="dot-fill" size={15} color={item["sex"] == 0 ? '#5665b8' : '#d64b4b'} />
                        <Text style={{
                            fontSize: 12,
                        }}>{item["writer"]}</Text>
                    </View>
                    
                    <View style={styles.lineBtm}>
                        <View style={{
                            width: "40%",
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                width: parseInt(windowWidth/8),
                                flexDirection: 'row',
                                marginRight: 10,
                                alignItems: 'center',
                            }}>
                                <Icon style={styles.lineBtmIcon} name="eye" size={15} color="black" />
                                <Text style={styles.lineBtmText}>{item["read"] > 999 ? "999+" : item["read"]}</Text>
                            </View>
                            <View style={{
                                width: parseInt(windowWidth/8),
                                flexDirection: 'row',
                                marginRight: 10,
                                alignItems: 'center',
                            }}>
                                <Icon style={styles.lineBtmIcon} name="heart-fill" size={15} color="black" />
                                <Text style={styles.lineBtmText}>{item["like"] > 999 ? "999+" : item["like"]}</Text>
                            </View>
                            <View style={{
                                width: parseInt(windowWidth/8),
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Icon style={styles.lineBtmIcon} name="comment" size={15} color="black" />
                                <Text style={styles.lineBtmText}>{item["replyCnt"] > 999 ? "999+" : item["replyCnt"]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                

                {/* 오른쪽 */}
                <View style={{ width: "25%", justifyContent: 'flex-end'}}>

                    {
                        item["images"] != "" ?
                        <Image
                            style={styles.lineImg}
                            source={{uri: item["images"]}}
                        ></Image> :
                        <></>
                    }
                    
                    
                    <View style={styles.lineRight}>
                        <View style={{
                            alignItems: 'flex-end',
                            marginRight: 10,
                        }}>
                            <Text numberOfLines={1} >{timeCompare(item["wdate"])}</Text>
                        </View>
                    </View>
                </View>
                


            </TouchableOpacity>
        </View> 
    );
};


function AnonymousScreen({navigation}) {
    console.log('@AnonymousScreen');
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [time, setTime] = useState(null);
    const [filter, setFilter] = useState([]);
    const [curFilter, setCurFilter] = useState("종합");

    let url = baseURL + "/anony/";

    const isFocused = useIsFocused();    

    useEffect(() => {
        // 부모 속성을 가져온 다음에 옵션으로 bar를 안 보이게 처리해야 한다.
        if(isFocused) {
            navigation.getParent().setOptions({
                tabBarStyle: { display: 'flex' },
            });
        }
    }, [isFocused]);

    /*useEffect(() => {
        const fetchBoard = async () => {
            try {
                setData(null);
                setError(false);
                
                const response = await getData(url+'board/0');
                if(response == 404 || response == 500) console.error("Server Error");
                else setData(response);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        };

        fetchBoard();
    }, [isFocused, error]);*/

    useQuery("anony_filter", async () => {
        await getData(url+'filter')
        .then(res => {
                setFilter(res);
            }
        );
    });

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const res = await getData(url+"board/0/"+curFilter+'/0');
                setData(res);
                setTime(getCurTime());
                console.log(time);
            } catch (e) {
                console.log('ERROR!!, ', e);
            }
        };

        fetchBoard();

    }, [curFilter]);
    

    const loadMoreOlderData = async () => {
        if (data[data.length-1]["uid"] == undefined) return;

        const fetchBoard = async () => {
            try {
                const res = await getData(url+"board/"+data[data.length-1]["uid"]+"/"+curFilter+'/1');
                setData((d) => { return d.concat(res); });
            } catch (e) {
                console.log('ERROR!!, ', e);
            }
        };

        fetchBoard();
    };

    

    const filterCard = (item) => {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    elevation: 4,
                    margin: 8,
                    paddingLeft: 10,
                    paddingRight: 10,
                }}>
                
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => { setCurFilter(item["item"]) }}
                >
                    <Text>{item["item"]}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    const flatListHeader = (filter) => {
        return (
            <View style={styles.profileArea}>
                <FlatList
                    style={{
                        //backgroundColor: 'blue'
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={filter}
                    //numColumns={filter.length}
                    renderItem={item => filterCard(item)}
                />
            </View>
        );
    }

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

    const myWriting = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -160]
                })
            }
        ]
    };

    const myLike = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -110]
                })
            }
        ]
    };

    const myWrite = {
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


    //if (isLoading) return "Loading...";

    //if (error) return "An error has occurred: " + error.message;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={loadMoreOlderData}
                    ListHeaderComponent={flatListHeader(filter)}
                    renderItem={item => boardCard({navigation, item, curFilter})}
                    keyExtractor={(item, index) => index}
                />

            <View style={styles.floating}>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floatingBtn, styles.myWriting, myWriting, opacity]}>
                        <TouchableOpacity>
                        <Icon name="repo" size={20} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floatingBtn, styles.myLike, myLike, opacity]}>
                        <TouchableOpacity>
                        <Icon name="heart" size={20} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floatingBtn, styles.myWrite, myWrite, opacity]}>
                        <TouchableOpacity
                            onPress={ () => navigation.navigate("라운지3", {filter: filter.slice(2)})}
                        >
                            <Icon name="pencil" size={20} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floatingBtn, styles.menu, rotation]}>
                        <TouchableOpacity onPress={toggleMenu}>
                            <Icon name="plus" size={30} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>

            </View>
        </SafeAreaView>
    );
}

export default AnonymousScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    main: {
        flex: 1,
        margin: 2,
    },
    row: {
        flexDirection: "row",
    },
    line: {
        height: parseInt(windowHeight/8),
        width: "100%",
        marginTop: 3,
        marginBottom: 3,
        paddingLeft: 5,
        paddingRight: 15,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: '#b6bab7',
        flexDirection: "row",
    },
    lineImg : {
        flex: 1,
        resizeMode: 'contain',
    },
    
    lineTop : {
        height: '40%',
    },
    lineMid : {
        height: '25%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    lineBtm : {
        height: '30%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    lineBtmText : {
        marginRight: 12,
    },
    lineBtmIcon : {
        marginRight: 5,
    },

    profileArea: {
        height: parseInt(windowHeight/15),
    },

    floating: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 50,
        width: 50,
    },
    floatingBtn: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#BAE7AF',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: "center",
        shadowRadius: 100,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: {height: 10}
    },
    menu: {
        width: 50,
        height: 50,
        //backgroundColor: "#F02A4B"
    },
    myWriting: {
        width: 45,
        height: 45,
        marginLeft: 2.5,
    },
    myLike: {
        width: 45,
        height: 45,
        marginLeft: 2.5,
    },
    myWrite: {
        width: 45,
        height: 45,
        marginLeft: 2.5,
    }

  });
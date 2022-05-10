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
    Dimensions,
    RefreshControl,
    ActivityIndicator
}
from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

import { timeCompare } from '../../Screen/util/getCurTime';
import Icon from 'react-native-vector-icons/Octicons';
import useStore, { useAnony } from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Title = (item) => {
    return(
        <View style={styles.lineTop}>
            <Text style={{
                marginTop: 10,
                fontWeight: "700",
                fontSize: 15,
            }}>{item.title}</Text>    
        </View>
    );
}

const Writer = (item) => {
    return(
        <View style={styles.lineMid}>
            <Text style={{
                marginRight: 10,
                color: '#b6bab7',
                fontSize: 12,
            }}>{item.type}</Text>
            <Icon style={styles.lineBtmIcon} name="dot-fill" size={15} color={item.isMine ? "#BAE7AF" : item.sex == 0 ? '#5665b8' : '#d64b4b'} />
            <Text style={{
                fontSize: 12,
            }}>{item.writer}</Text>
        </View>
    );
}

const RLC = (item) => {
    const isDarkMode = useStore((state) => state.isDarkMode);
    return(
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
                    <Icon style={styles.lineBtmIcon} name="eye" size={15} color={isDarkMode ? "#BAE7AF" : Colors.black} />
                    <Text style={styles.lineBtmText}>{item.read > 999 ? "999+" : item.read}</Text>
                </View>
                <View style={{
                    width: parseInt(windowWidth/8),
                    flexDirection: 'row',
                    marginRight: 10,
                    alignItems: 'center',
                }}>
                    <Icon style={styles.lineBtmIcon} name="heart-fill" size={15} color={item.isLike == 1 ? "red" : isDarkMode ? "#BAE7AF" : Colors.black} />
                    <Text style={styles.lineBtmText}>{item.like > 999 ? "999+" : item.like}</Text>
                </View>
                <View style={{
                    width: parseInt(windowWidth/8),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Icon style={styles.lineBtmIcon} name="comment" size={15} color={isDarkMode ? "#BAE7AF" : Colors.black} />
                    <Text style={styles.lineBtmText}>{item.replyCnt > 999 ? "999+" : item.replyCnt}</Text>
                </View>
            </View>
        </View>
    );
}

const Thumnail = (item) => {
    if(item.images == "") return(<></>);
    return(
        <Image
            style={styles.lineImg}
            source={{uri: item.images}}
            /*source={{
                uri: 'https://reactjs.org/logo-og.png',
                method: 'POST',
                headers: {
                  Pragma: 'no-cache'
                },
                body: 'Your Body goes here'
              }}*/
        ></Image>
    );
}

const Time = (item) => {
    return(
        <View style={styles.lineRight}>
            <View style={{
                alignItems: 'flex-end',
                marginRight: 10,
            }}>
                <Text numberOfLines={1} >{timeCompare(item.wdate)}</Text>
            </View>
        </View>
    );
}

const Molecules = ({item, curFilter, navigation}) => {
    const isDarkMode = useStore((state) => state.isDarkMode);
    if(curFilter != '종합' && curFilter != item.type) {
        return (<></>)
    }
    return(
        <View style={[styles.line, {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }]}>
            <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('BoardDetail', {paramKey: item })}
            >
                {/* 왼쪽 */}
                <View style={{ width: "75%", marginLeft: 10,}}>
                    <Title title={item.title} />
                    <Writer type={item.type} sex={item.sex} writer={item.writer} isMine={item.isMine} />
                    <RLC read={item.read} like={item.like} replyCnt={item.replyCnt} isLike={item.isLike} />
                </View>
                {/* 오른쪽 */}
                <View style={{ width: "25%", justifyContent: 'flex-end'}}>
                    <Thumnail images={item.images} />
                    <Time wdate={item.wdate} />
                </View>
            </TouchableOpacity>
        </View> 
    );
}


const FloatingFunc = ({animation, toggleMenu, props}) => {

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

    return(
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
                        onPress={ () => {
                            toggleMenu();
                            props.props.navigation.navigate("BoardWriting", {params: 'writing'});
                            //props.props.navigation.navigate("BoardWriting", {filter: props.state.filterData});
                        }}
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
    );
}

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function BoardListPresenter(props) {

    console.log('@BoardListPresenter');

    const isFocused = useIsFocused();    
    const isDarkMode = useStore((state) => state.isDarkMode);

    useEffect(() => {
        if(isFocused) {
            props.state.loadMoreNewerData();
        }
    }, [isFocused]);

    const onRefresh = React.useCallback(() => {
        props.state.setRefreshing(true);
        wait(2000).then(() => props.state.setRefreshing(false));
      }, []);

    const boardCard = ({item}) => {
        return ( <Molecules item={item.item} curFilter={props.state.getCurFilter()} navigation={props.props.navigation} /> );
    };

    const filterTag = ({item}) => {
        return (
            <View
                style={[styles.filterTag, {
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    borderColor: isDarkMode ? "#BAE7AF" : Colors.white,
                    borderWidth: 1,
                }]}>
                
                <TouchableOpacity
                    style={[styles.touchArea]}
                    onPress={() => { props.state.setCurFilter(item.name) }}
                >
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const flatListHeader = (filter) => {
        if(filter.length == 0) {
            return(
                <TouchableOpacity>
                    <ActivityIndicator />
                </TouchableOpacity>
            );    
        }
        return (
            <View style={styles.profileArea}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={filter}
                    //data={useAnony.getState().Filter}
                    renderItem={item => filterTag(item)}
                />
            </View>
        );
    }

    const animation = useRef(new Animated.Value(0)).current; //new Animated.Value(0);
    let open = 0;

    const FloatingBtn = () => {
        const toggleMenu = () => {
            const toValue = open ? 0 : 1;
    
            Animated.spring(animation, {
                toValue,
                friction: 5,
                useNativeDriver: false
            }).start();
            
            open = !open;
        };

        return(
        <FloatingFunc 
            animation={animation} 
            toggleMenu={toggleMenu}
            props={props}
        />);
    }

    if(props.state.boardData.length == 0) {
        return(<View><ActivityIndicator /></View>);
    }

    return(
        <SafeAreaView style={[styles.container, {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }]}>
            <View style={styles.main}>
                <FlatList
                    data={props.state.boardData}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={props.state.loadMoreOlderData}
                    onEndReachedThreshold={0.7}
                    refreshControl={
                        <RefreshControl
                          refreshing={props.state.getRefreshing()}
                          onRefresh={onRefresh}
                        />
                      }
                    ListHeaderComponent={flatListHeader(props.state.filterData)}
                    renderItem={item => boardCard({item})}
                    //keyExtractor={(item) => item.uid}
                />
                <FloatingBtn />
            </View>
        </SafeAreaView>
    );
}

export default BoardListPresenter;



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
    filterTag: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 4,
        margin: 8,
        paddingLeft: 10,
        paddingRight: 10,
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
        resizeMode: 'cover',
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
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    Modal,
    ScrollView
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { useIsFocused } from '@react-navigation/native';
import { useUserParty } from '../../AppContext';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function SubPartyPresenter(props) {
    console.log('@SubPartyPresenter');

    //const [ref, setRef] = useState(null);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            if (props.state.positionY > 50) return;
            props.state.loadMoreNewerData();
        }
    }, [isFocused]);

    const navigation = props.props.navigation;

    const onRefresh = React.useCallback(() => {
        props.state.setRefreshing(true);
        wait(2000).then(() => props.state.setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/*<Header headerParams={headerParams}/>*/}
            <View style={styles.main}>
                <FlatList
                    //ref={(ref) => setRef(ref)}
                    ref={props.state.ref}
                    data={Object.values(useUserParty.getState().partyData).reverse()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={Filter(props.state)}
                    onEndReached={
                        ({ distanceFromEnd }) => { props.state.loadMoreOlderData(distanceFromEnd) }
                    }
                    onMomentumScrollBegin={() => { props.state.setMomentum(false) }}
                    ListFooterComponent={
                        props.state.isLastData ?
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                            }}>
                                <Text>이게 마지막 게시물이에요!</Text>
                            </View> :
                            props.state.onEndReachedCalledDuringMomentum && <ActivityIndicator />
                        //<ActivityIndicator />
                    }

                    onScroll={evt => props.state.setPositionY(evt.nativeEvent.contentOffset.y)}
                    // 스레드값이 컬럼이 1이 아닌경우엔 쓰면 안 되나봄?
                    onEndReachedThreshold={0.7}
                    //columnWrapperStyle={{ flexWrap: 'wrap', flex: 1}}
                    numColumns={3}
                    refreshControl={
                        <RefreshControl
                            refreshing={props.state.getRefreshing()}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={item => <BoardCard navigation={navigation} item={item} />}
                    initialNumToRender={9}
                    windowSize={3}
                /*getItemLayout={(data, index) => (
                    {length: 150, offset: 150 * index, index}
                  )}*/
                />
            </View>
            <TouchableOpacity style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                height: 50,
                width: 50,
                borderRadius: 100,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={() =>
                    props.state.positionY > 600 ?
                        props.state.ref.current.scrollToOffset({
                            offset: 1,
                            animated: true
                        }) :
                        navigation.navigate('PartyNavigator', { screen: 'SubPartyWriting' })
                }
            >
                <Icon name={props.state.positionY > 600 ? "arrow-up" : "plus"} size={30} color="white" />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default SubPartyPresenter;

export const BoardCard = React.memo(({ navigation, item }) => {
    // 여기서 if로 boardCard 구분 가능
    const idx = item.index;
    item = item["item"];
    
    return (
        <View
            style={{
                flex: 1,
                //width: "30%",
                //flexDirection: 'row',
                //flexWrap: 'nowrap',
                margin: 3,
                //padding: 3,
                marginBottom: 10,
            }}
            // 이렇게 해야 each child should have a unique key 뭐 이딴 오류 안 뜬다.
            key={'party_' + idx}
        >

            <TouchableOpacity
                style={{
                    //backgroundColor: 'blue',
                    //marginLeft: 'auto',
                    //marginRight: 'auto',
                }}
                onPress={() => navigation.navigate('PartyNavigator', { params: { uid: item.uid }, screen: 'SubPartyDetail' })}
            >
                <Text style={{
                    position: 'absolute',
                    padding: item.isLike ? 5 : 0,
                    zIndex: 100,
                    bottom: 35,
                    right: 5,
                }}>
                    {item.isLike ? <Icon name='heart-fill' size={25} color='red' /> : ''}
                </Text>
                {
                    item.images == '' ? <View style={styles.imageThumbnail}></View> :
                        <Image
                            style={[styles.imageThumbnail, {
                                borderColor: item.state == 0 ? 'mediumvioletred' : 'midnightblue',
                            }]}
                            source={{ uri: item.images }}
                        />
                }

                <View style={{
                    //padding: 5,
                }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 12,
                            fontWeight: '700',
                            marginBottom: -2,

                        }}>{item.title}</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}>
                        <Icon name="dot-fill" size={15} color={item.isMine == 1 ? '#BAE7AF' : item.sex == 0 ? "blue" : 'red'} />
                        <View style={{
                            flexDirection: 'row',
                            marginLeft: 5,
                            marginBottom: 2,
                        }}>
                            {item.tags.map(data => {
                                return (
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            marginRight: 5,
                                        }}
                                        numberOfLines={1}
                                    >{data}</Text>
                                )
                            })
                            }
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );
});

const FilterTag = (props) => {
    return (
        <View key={'filter_' + props.item.index}>
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPressIn={() => props.state.tagIn()}
                onPressOut={() => props.state.tagOut()}
                onPress={() => props.state.setCurFilter(props.item.item)}
            >
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: props.state.curFilter == props.item.item ? '#BAE7AF' : 'white',
                    borderRadius: 10,
                    elevation: 4,
                    marginLeft: 5,
                    marginRight: 5,
                    padding: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 15,
                    marginBottom: 15,
                }}>
                    <Text style={{
                        fontSize: 13,
                    }}>{props.item.item}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Filter = (state) => {
    //console.log(state);
    return (
        <View>
            <TouchableOpacity style={{
                padding: 5,
                margin: 5,
                justifyContent: 'center',
                alignItems: 'flex-end'
            }}
                onPress={() => state.setFilterModal(true)}
            >
                <Icon name='filter' size={30} />
                {
                    state.filterModal == false ? <></> :
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={state.filterModal}
                        >
                            <View style={{
                                flex: 1,
                                marginTop: 140,
                                marginBottom: 100,
                                marginLeft: 60,
                                marginRight: 60,
                                backgroundColor: 'white',
                            }}>

                                <View style={{
                                    height: 30,
                                    backgroundColor: 40,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                }}>
                                    <View><Text>필터</Text></View>
                                    <TouchableOpacity
                                        onPress={() => state.setFilterModal(false)}
                                    >
                                        <Icon name='x' size={20} />
                                    </TouchableOpacity>
                                </View>

                                <ScrollView style={{
                                    padding: 10,
                                }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                        }}>성별</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}>
                                            <CheckBox
                                                disabled={false}
                                                value={state.mCheck}
                                                onValueChange={(newValue) => state.setCheck('m', newValue)}
                                            />
                                            <Text>남자</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <CheckBox
                                                disabled={false}
                                                value={state.wCheck}
                                                onValueChange={(newValue) => state.setCheck('w', newValue)}
                                            />
                                            <Text>여자</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                    }}>
                                        <Text style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            marginRight: 10,
                                        }}>일자</Text>
                                        {/*<DatePicker
                                            //value={obj.place}
                                            style={{
                                                width: 190,
                                                height: 40,
                                                borderWidth: 1,
                                            }}
                                            date={state.dateTime}
                                            //onDateChange={setDateTime}
                                            //onChange={handleChange}
                                            locale='ko'
                                            mode="date"
                                        />*/}
                                        <Calendar
                                            onDayPress={day => {
                                                state.setPeriod(day);
                                            }}
                                            enableSwipeMonths={true}
                                            markingType={'period'}
                                            markedDates={state.markedDates}
                                        //displayLoadingIndicator={true}
                                        />
                                    </View>
                                    
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        marginTop: 5,
                                    }}>태그</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        marginBottom: 20,
                                    }}>
                                        {
                                            useUserParty.getState().filterData.map(data => {
                                                return(
                                                    <TouchableOpacity style={{
                                                        padding: 5,
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        backgroundColor: state.curFilter.includes(data) ? 'red' : 40,
                                                        margin: 3,
                                                        borderRadius: 20,
                                                    }}
                                                    onPress={() => {
                                                        state.setCurFilter(data);
                                                    }}>
                                                        <Text>{data}</Text>
                                                    </TouchableOpacity>
                                                );
                                            })
                                        }
                                    </View>
                                </ScrollView>

                                <View style={{
                                    height: 40,
                                    backgroundColor: 'white',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 5,
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                }}>
                                    <TouchableOpacity style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                        //onPress={() => state.filterReset()}
                                    >
                                        <Text>선택초기화</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'skyblue',
                                        padding: 5,
                                        borderRadius: 5,
                                    }}
                                        onPress={() => state.doFiltering()}
                                    >
                                        <Text>파티보기</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>
                }
            </TouchableOpacity>
            <TouchableOpacity style={{
                //flex: 1,
                marginBottom: 2,
            }}>
                <Image
                    style={{
                        width: '100%',
                        resizeMode: 'contain',
                    }}
                    source={require('../banner.png')}
                />
            </TouchableOpacity>
        </View>
    );
    return (
        <View
            style={{
            }}>

            <View
                style={{
                }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        //backgroundColor: 'blue',
                    }}
                    horizontal={true}
                    data={useUserParty.getState().filterData}
                    //numColumns={filter.length}
                    renderItem={item => FilterTag({ item, state })}
                />
            </View>

            <TouchableOpacity style={{
                flex: 1,
                marginBottom: 2,
            }}>
                <Image
                    style={{
                        width: '100%',
                        resizeMode: 'contain',
                    }}
                    source={require('../banner.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

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
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: parseInt(windowHeight / 6.7),
        //width: parseInt(windowHeight/6.7),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 50,
        resizeMode: 'cover',
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
        shadowOffset: { height: 10 }
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
import React, { useState } from 'react';
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
    Modal,
    ScrollView,
    Animated,
    Pressable
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import MainPartyStyle from './MainPartyStyle';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function MainPartyPresenter(props) {
    console.log('@MainPartyPresenter');

    const navigation = props.props.navigation;

    const onRefresh = React.useCallback(() => {
        props.state.setRefreshing(true);
        wait(2000).then(() => props.state.setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={MainPartyStyle.container}>
            <View style={MainPartyStyle.main}>
                <FlatList
                    data={props.state.partyData}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    //extraData={filterValue}
                    onEndReached={props.state.loadMoreOlderData}
                    onEndReachedThreshold={0.7}
                    ListHeaderComponent={Header(props)}
                    refreshControl={
                        <RefreshControl
                            refreshing={props.state.getRefreshing()}
                            onRefresh={onRefresh}
                        />
                    }
                    numColumns={2}
                    renderItem={item => boardCard({ navigation, item })}
                />
            </View>
        </SafeAreaView>
    );
}

export default MainPartyPresenter;

const boardCard = (props) => {
    // 여기서 if로 boardCard 구분 가능

    let item = props.item.item;
    const idx = props.item.index;
    //console.log(props.navigation.getParent().getParent().getState());

    return (
        <View style={MainPartyStyle.line} key={idx} >
            <TouchableOpacity
                style={MainPartyStyle.col}
                onPress={() => props.navigation.getParent().getParent().navigate('PartyNavigator', { params: item, screen: 'MainPartyDetail' })}
            >

                <View style={MainPartyStyle.lineTop}>
                    <Image
                        style={MainPartyStyle.lineTopImg}
                        source={{ uri: item.images == '' ? 'http://192.168.1.243:4001/media/image/?imageName=mainParty 3.jpg' : item.images }}

                    //onLoad={ () => {console.log('loaded', item["title"])}}
                    //onLoadStart={ () => {console.log('loading', item["title"])}}
                    />
                </View>

                <View style={MainPartyStyle.content}>
                    <View style={MainPartyStyle.contentTop}>
                        <View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "700",
                                }}
                            >{item["title"]}</Text>
                        </View>
                        {/*<View style={MainPartyStyle.contentTopRight}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Icon name="dot" size={15} color="blue" />
                                    <Text style={{marginLeft: 5, marginRight: 10,}}>{"1/"+item.ableM}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Icon name="dot" size={15} color="red" />
                                    <Text style={{marginLeft: 5, marginRight: 5,}}>{"2/"+item.ableF}</Text>
                                </View>
                            </View>*/}

                    </View>

                    <View style={MainPartyStyle.contentMid}>
                        <Icon name="calendar" size={15} color="#BAE7AF" />
                        <Text
                            style={{
                                marginLeft: 10,
                            }}
                        >{item["mdate"]}</Text>
                    </View>

                    <View style={MainPartyStyle.contentBtm}>
                        <Icon name="location" size={15} color="#BAE7AF" />
                        <Text
                            style={{
                                marginLeft: 10,
                            }}
                        >{item["place"]}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        </View>

    );
};

const Header = (props) => {
    return (
        <View style={{
            flexDirection: 'row',
        }}>
            <TouchableOpacity
                onPress={() => props.state.setModalVisiable('filter', true)}
            >
                {
                    props.state.filterModalVisiable ?
                        <Filter state={props.state} /> :
                        <></>
                }
                <Icon name="filter" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.state.setModalVisiable('schedule', true)}
            >
                {
                    props.state.scheduleModalVisiable ?
                        <Schedule state={props.state} /> :
                        <></>
                }
                <Icon name="calendar" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const Filter = ({ state }) => {

    const ageAnimation = {
        transform: [
            {scale: state.animation},
            {
                translateY: state.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -160]
                })
            }
        ]
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={state.filterModalVisiable}
        >
            <View style={{
                flex: 1,
                marginTop: 140,
                marginBottom: 140,
                marginLeft: 60,
                marginRight: 60,
                backgroundColor: 'white',
            }}>

                <ScrollView
                    style={{ flex: 1, padding: 10, }}
                    scrollEnabled={state.scrollEnabled}>

                    <View>
                        <TouchableOpacity style={{
                            padding: 5,
                            backgroundColor: 30,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                            onPress={() => {
                                Animated.spring(state.animation, {
                                    toValue: 1,
                                    friction: 5,
                                    useNativeDriver: false
                                }).start();
                            }}
                        >
                            <Text>나이</Text>
                            <Icon name='triangle-down' size={25} />
                        </TouchableOpacity>
                        
                            <Animated.View style={[{
                                justifyContent: 'center',
                                alignItems: 'center',

                            }, ageAnimation]}>

                                <MultiSlider
                                    sliderLength={parseInt(windowWidth / 1.8)}
                                    isMarkersSeparated={true}
                                    values={[state.multiSliderValue[0], state.multiSliderValue[1]]}
                                    min={0}
                                    max={100}
                                    allowOverlap={false}
                                    minMarkerOverlapDistance={10}
                                    touchDimensions={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        slipDisplacement: 40
                                    }}
                                    onValuesChange={state.setMultiSliderValue}
                                    onValuesChangeStart={state.disableScroll}
                                    onValuesChangeFinish={state.enableScroll}

                                    customMarkerLeft={(e) => {
                                        return (
                                            <View>
                                                <View style={{
                                                    position: 'absolute',
                                                    top: -5,
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 100,
                                                    backgroundColor: 'green',
                                                }}></View>
                                                <Text style={{
                                                    position: 'absolute',
                                                    top: -25,
                                                }}>{e.currentValue}</Text>
                                            </View>
                                        )
                                    }}

                                    customMarkerRight={(e) => {
                                        return (
                                            <View>
                                                <View style={{
                                                    position: 'absolute',
                                                    top: -5,
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 100,
                                                    backgroundColor: 'green',
                                                }}></View>
                                                <Text style={{
                                                    position: 'absolute',
                                                    top: -25,
                                                }}>{e.currentValue}</Text>
                                            </View>
                                        )
                                    }}
                                />
                            </Animated.View>
                    </View>



                    <View>
                        <Text>일정</Text>
                    </View>

                    <View>
                        <Calendar
                            onDayPress={day => {
                                console.log('selected day', day);
                                state.setPeriod(day);
                            }}
                            enableSwipeMonths={true}
                            markingType={'period'}
                            markedDates={state.markedDates}
                        //displayLoadingIndicator={true}
                        />
                    </View>

                    <View>
                        <Text>지역</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginBottom: 20,
                    }}>
                        {
                            state.location.map(data => {
                                return (
                                    <TouchableOpacity style={{
                                        padding: 5,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        backgroundColor: 40,
                                        margin: 3,
                                        borderRadius: 20,
                                    }}>
                                        <Text style={{
                                        }}>{data}</Text>
                                    </TouchableOpacity>
                                );

                            })
                        }
                    </View>

                </ScrollView>

            </View>
        </Modal>
    );
}


const Schedule = ({ state }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={state.scheduleModalVisiable}
        >

        </Modal>
    );
}

/*const dropDownMenu = (props) => {
    return(
        <ModalDropdown 
            options={props.state.filterData}
            onSelect={(val) => {
                props.state.setCurFilter(val)
            }}
            defaultIndex={props.state.selectedFilter}
            defaultValue={props.state.filterData[props.state.selectedFilter]}
            style={{
                height: 30,
                width: 130,
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 3,
                justifyContent: 'center',
                paddingLeft: 15,
                marginLeft: 15,
                marginTop: 10,
            }}
            textStyle={{
                fontSize: 15,
                fontWeight: "500",
            }}
            dropdownStyle={{
                width: 110,
                height: 40*3,
                fontSize: 13,
                fontWeight: "400",
            }}
            dropdownTextStyle={{
                borderBottomWidth: 1,

            }}
            dropdownTextHighlightStyle={{
                fontWeight: "700",
            }}
            showsVerticalScrollIndicator={true}
        >
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{
                    width: "80%",
                }}><Text>{props.state.filterData[props.state.selectedFilter]}</Text></View>
                
                <View style={{
                    width: "20%",
                }}><Icon name="chevron-down" size={20} color="#BAE7AF"/></View>
                
            </View>
        </ModalDropdown>
    );
}*/


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
    Easing,
    Pressable
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import MainPartyStyle from './MainPartyStyle';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import useStore from '../../AppContext';

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
                        source={{ uri: item.images.length == 0 ? 'http://192.168.1.243:4001/media/image/?imageName=mainParty 3.jpg' : useStore.getState().picURL + item.images[0] }}

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
        flex: 1,
        opacity: state.ageAnimation,
        display: state.ageActive ? 'flex' : 'none'
    };

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={state.filterModalVisiable}
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
                        onPress={() => state.setModalVisiable('filter', false)}
                    >
                        <Icon name='x' size={20} />
                    </TouchableOpacity>
                </View>

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
                                console.log(state.ageActive ? 0 : 1);
                                state.setAgeActive();
                                Animated.timing(state.ageAnimation, {
                                    toValue: state.ageActive ? 0 : 1,
                                    duration: 1000,
                                    easing: Easing.back(),
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
                                        backgroundColor: state.selectedLocation.includes(data) ? 'red' : 40,
                                        margin: 3,
                                        borderRadius: 20,
                                    }}
                                    onPress={() => {
                                        state.locationSelecting(data);
                                    }}
                                    >
                                        <Text style={{
                                        }}>{data}</Text>
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
                    onPress={() => state.filterReset()}
                    >
                        <Text>선택초기화</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'blue',
                        padding: 5,
                        borderRadius: 5,
                    }}
                    onPress={() => state.setCurFilter()}
                    >
                        <Text>파티보기</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
}


const Schedule = ({ state }) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={state.scheduleModalVisiable}
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
                    <View><Text>일정</Text></View>
                    <TouchableOpacity
                        onPress={() => state.setModalVisiable('schedule', false)}
                    >
                        <Icon name='x' size={20} />
                    </TouchableOpacity>
                </View>
            </View>
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


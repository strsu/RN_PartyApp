import React, {useState} from 'react';
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
    RefreshControl
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import ModalDropdown from 'react-native-modal-dropdown';

import MainPartyStyle from './MainPartyStyle';

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
                    ListHeaderComponent={dropDownMenu(props)}
                    refreshControl={
                        <RefreshControl
                          refreshing={props.state.getRefreshing()}
                          onRefresh={onRefresh}
                        />
                      }
                    numColumns={2}
                    renderItem={ item => boardCard( {navigation, item} ) }
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
                    onPress={() => props.navigation.getParent().getParent().navigate('PartyNavigator', {params: item, screen: 'MainPartyDetail'})}
                >

                    <View style={MainPartyStyle.lineTop}>
                        <Image
                            style={MainPartyStyle.lineTopImg}
                            source={{uri: item.images == '' ? 'http://192.168.1.243:4001/media/image/?imageName=mainParty 3.jpg' : item.images}}
                            
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

const dropDownMenu = (props) => {
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
}


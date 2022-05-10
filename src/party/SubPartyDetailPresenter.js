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
    Modal,
    Alert,
    Pressable
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { timeCompare } from '../../Screen/util/getCurTime';
import { useUserParty } from '../../AppContext';

import SubPartyDatailProfilePresenter from './SubPartyDatailProfilePresenter';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SubPartyDetailPresenter(props) {
    console.log('@SubPartyDetailPresenter');
    
    // 로딩하면서 아직 변수 업데이트가 안되는 경우가 많다.
    // 일단 undefined면 리턴하고 업데이트되면 어차피 렌더 다시함
    if(props.state.headerData == undefined) return(<></>);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <FlatList
                    data={ props.state.headerData.isMine ? props.state.recommandData : props.state.partyData}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={ props.state.headerData.isMine ? 3 : 1}
                    ListHeaderComponent={FlatListHeader(props)}
                    renderItem={item => props.state.headerData.isMine ? boardCardAttender({props, item}) : boardCard({props, item}) }
                />
            </View>
            <UserProfile props={props} />
        </SafeAreaView>
    );
}

const ModalPopUp = (props) => {
    
    //
    const item = props.item;
    const f = props.props.state;

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={f.getWhichUID() == item.uid ? f.getPartyApply() : {}}
            /*onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            f.partyApply();
            }}*/
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
            }}>
                <View style={{
                    margin: 10,
                    backgroundColor: "white",
                    borderRadius: 20, 
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingTop: 15,
                    paddingBottom: 15,
                    alignItems: "center",
                    // ios
                    shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    // aos
                    elevation: 5
                }}>
                    <Text style={{
                        marginBottom: 15,
                        textAlign: "center"
                    }}>{item.title + '파티를 신청하시나요?'}</Text>
                    <Text style={{
                        marginBottom: 15,
                        textAlign: "center"
                    }}>{'(파티신청을 5음표가 소모됩니다.)'}</Text>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Pressable
                            style={{
                                borderRadius: 20,
                                padding: 10,
                                elevation: 2,
                                margin: 5,
                            }}
                            onPress={() => f.partyApply(true, item.uid, props.idx)}
                        >
                            <Text style={styles.textStyle}>네</Text>
                        </Pressable>

                        <Pressable
                            style={{
                                borderRadius: 20,
                                padding: 10,
                                elevation: 2,
                                margin: 5,
                            }}
                            onPress={() => f.partyApply(false)}
                        >
                            <Text style={styles.textStyle}>아니요</Text>
                        </Pressable>
                    </View>
                    
                </View>
            </View>
        </Modal>
    );
}

const boardCard = ({props, item}) => {
    if(props.state.partyAddonData.length == 0) return(<></>);

    //console.log(props.state.addonBtn);

    // 여기서 if로 boardCard 구분 가능
    const idx = item.index;
    item = item.item;

    return(
        <View style={{
            padding: 5,
            marginBottom: 10,
            backgroundColor: 'white',
            elevation: 3,
            }}
            key={'tag_'+idx}
        >
            
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Icon name="dot-fill" size={15} color={item.isMine == 1 ? '#BAE7AF' : item.sex == 0 ? "blue" : 'red'} />
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700',
                        marginLeft: 5,
                    }}>{item.nickname}</Text>
                </View>
                <Icon name='bell' size={25} />
            </View>

            <View style={{
            }}>
                <Image
                    style={{
                        height: item.images != '' ? 300 : 0,
                    }}
                    source={item.images != '' ? {uri: item.images} : {}}
                />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
            }}>
                <Text>{item.tags}</Text>
                <Text>{item.date}</Text>
            </View>

            <View style={{
                marginTop: 5,
            }}>
                <Text>{item.title}</Text>
            </View>

            <View style={{
                marginTop: 5,
            }}>
                <Text>{item.content}</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 5,
            }}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{
                        marginRight: 10,
                    }}
                        onPress={item.isMine ? {} : () => props.state.addonBtn('like', item.uid, idx)}
                    >
                        <Icon name={props.state.partyAddonData[idx].isLike ? 'heart-fill' : 'heart'} size={25} color={props.state.partyAddonData[idx].isLike ? 'red' : 'gray'} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{
                        
                    }}
                        onPress={item.isMine ? {} : () => props.state.addonBtn('dibs', item.uid, idx)}
                    >
                        <Icon name='bookmark' size={25} color={props.state.partyAddonData[idx].isDibs ? 'red' : 'gray'} />
                    </TouchableOpacity>
                </View>
                
                <View style={ 
                    item.sex == props.state.userSEX ?
                    { } :
                    {
                        padding: 5,
                        paddingRight: 10,
                        paddingLeft: 10,
                        backgroundColor: '#91e3de',
                        borderRadius: 10,
                        elevation: 5,
                    }
                }>
                    {
                        item.sex == props.state.userSEX ?
                        <></> :
                        <View>
                            <TouchableOpacity
                                onPress={() => item.isApply ? {} : props.state.partyApply(false, item.uid, idx)}
                            >
                                {
                                    props.state.getWhichUID() == item.uid
                                    ?
                                    <ModalPopUp props={props} item={item} idx={idx}/>
                                    :
                                    <></>
                                }                                
                                <Text>{item.isApply ? '신청완료' : '파티신청'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};

const boardCardAttender = (props) => {
    // 여기서 if로 boardCard 구분 가능
    const state = props.props.state;
    const item = props.item.item;
    
    return (
        <View
            style={{
                flex: 1,
                margin: 3,
                marginBottom: 10,
                padding: 5,
            }}
            key={'attender_'+props.item.index}    
        >
            
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                }}
                //onPress={() => navigation.navigate('SubPartyDetail', {params: item})}
                //onPress={() => props.state.setUserModal(true, item)}
                onPress={() => {Object.values(item).length != 0 ? state.setUserModal(true, item) : {}}}
            >
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                    overflow: 'hidden',
                }}>
                    <Image
                        style={styles.imageThumbnail}
                        source={{uri: item.image}}
                        //blurRadius={90}
                    />
                </View>
                
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text 
                    numberOfLines={1}
                    style={{
                            fontSize: 12,
                            fontWeight: '700',
                            marginBottom: -3,
                            padding: 5,
                            
                        }}>{ item.nickname === undefined ? '' : item.nickname}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const UserProfile = ({props}) => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.state.userModalVisiable}
        >
            <View style={{
                flex: 1,
                padding: 10,
                margin: 10,
                //backgroundColor: 'white',
            }}>
                <SubPartyDatailProfilePresenter props={props} />
            </View>
        </Modal>
    );
}


const FlatListHeader = (props) => {
    const item = props.state.headerData;
    const state = props.state;

    if(item == undefined) {
        return(<></>);
    }

    return(
        <View style={{
            padding: 5,
            marginBottom: 10,
            backgroundColor: 'white',
            elevation: 3,
        }}>
            
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                padding: 5,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Icon name="dot-fill" size={15} color={item.isMine ? '#BAE7AF' : item.sex == 0 ? "blue" : 'red'} />
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700',
                        marginLeft: 5,
                    }}>{item.nickname}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => state.setKebabModal(true)}
                >
                    <Icon name='kebab-horizontal' size={25} />
                    {
                        state.kebabModalVisiable ? <KebabModal props={props} item={item} /> : <></>
                    }
                </TouchableOpacity>
            </View>

            <View style={{
            }}>
                <Image
                    style={{
                        height: item.images != '' ? 300 : 0,
                    }}
                    source={item.images != '' ? {uri: item.images} : {}}
                />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
            }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    marginBottom: 2,
                }}>
                    {
                        item.tags.map(data => {
                            return(
                                <Text 
                                    style={{
                                        marginRight: 5,
                                    }}
                                    numberOfLines={1}
                                >{data}</Text>
                        )})
                    }
                </View>
                <Text>{item.date}</Text>
            </View>

            <View style={{
                marginTop: 5,
            }}>
                <Text>{item.title}</Text>
            </View>

            <View style={{
                marginTop: 5,
            }}>
                <Text>{item.content}</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 5,
            }}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{
                        marginRight: 10,
                    }}
                        onPress={item.isMine ? () => state.addonFun() : () => state.addonBtn('like', item.uid, -1)}
                    >
                        <Icon name={item.isLike ? 'heart-fill' : 'heart'} size={25} color={item.isLike ? 'red' : 'gray'} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{
                        
                    }}
                        onPress={item.isMine ? () => state.addonFun() : () => state.addonBtn('dibs', item.uid, -1)}
                    >
                        <Icon name='bookmark' size={25} color={item.isDibs ? 'red' : 'gray'} />
                    </TouchableOpacity>
                </View>

                <View style={ 
                    item.sex == state.userSEX ? {} :
                    item.isMine ? {} :
                    {
                        padding: 5,
                        paddingRight: 10,
                        paddingLeft: 10,
                        backgroundColor: '#91e3de',
                        borderRadius: 10,
                        elevation: 5,
                    }
                }>
                    {
                        item.sex == state.userSEX ? <></> :
                        item.isMine ? <></> :
                        <View>
                            <TouchableOpacity
                                onPress={() => item.isApply ? {} : state.partyApply(false, item.uid, -1)}
                            >
                                {
                                    state.getWhichUID() == item.uid
                                    ?
                                    <ModalPopUp props={props} item={item} idx={-1}/>
                                    :
                                    <></>
                                }   
                                <Text>{item.isApply ? '신청완료' : '파티신청'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

            </View>

            <View style={{
                height: 100,
                backgroundColor: 'gray',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 40,
                }}>{item.isMine ? '파티를 신청한 사람' : '비슷한 태그'}</Text>
            </View>

        </View>
    );
}

const KebabModal = ({props, item}) => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.state.kebabModalVisiable}
        >
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
            }}>
                <View style={{
                    margin: 5,
                    marginLeft: 15,
                    marginRight: 15,
                    backgroundColor: 'black',
                    borderRadius: 10,
                }}>
                    {/*
                        item.isMine ?
                            <TouchableOpacity style={{
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 15,
                                borderRadius: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: 'gray',
                            }}
                                onPress={() => {
                                    props.props.navigation.navigate('SubPartyWriting', { item: props.state.item, filter: props.state.filter })
                                }}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    color: 'white',
                                }}>글 수정</Text>
                            </TouchableOpacity> :
                            <></>
                    */}

                    <TouchableOpacity style={{
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 15,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: 'red',
                        }}>{item.isMine ? '삭제' : '신고'}</Text>
                    </TouchableOpacity>
                    
                </View>

                <TouchableOpacity style={{
                    backgroundColor: 'black',
                    alignItems: 'center',
                    borderRadius: 10,
                    padding: 15,
                    margin: 15,
                }}
                    onPress={() => props.state.setKebabModal(false)}
                >
                    <Text style={{
                        fontSize: 15,
                        color: 'white',
                    }}>닫기</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
}

export default SubPartyDetailPresenter;

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
    touchArea: {
        borderRadius: 10,
        backgroundColor: 'blue',
    },
    imageThumbnail: {
      //height: parseInt(windowHeight/6),
      //width: parseInt(windowHeight/6.7),
      width: '100%',
      aspectRatio: 1,
      //borderRadius: 1000,
      resizeMode: 'stretch',
      //backgroundColor: 'white',
    },
});
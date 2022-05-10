import React, { useState } from 'react';
import {
    SafeAreaView,
    FlatList,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    StyleSheet,
    ScrollView,
    Alert
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SubPartyDatailProfilePresenter({props}) {
    console.log('@SubPartyDatailProfilePresenter');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}
                showsVerticalScrollIndicator={false}
            >
                <Profile props={props} />
                <View style={{
                    flex: 1,
                    margin: 10,
                    //padding: 5,
                    paddingTop: 100,
                    marginTop: 80,
                    borderWidth: 4,
                    borderRadius: 20,
                    borderColor: 'black',
                    backgroundColor: 'white',
                }}>

                    <Content props={props} />
                    <FlatListImage props={props} />
                    <Question props={props} />

                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                    }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            padding: 10,
                            margin: 5,
                            backgroundColor: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                            onPress={() => props.state.setUserModal(false, false)}
                        >
                            <Text>닫기</Text>
                        </TouchableOpacity>
                        {
                            props.state.selectedUser.attend == 0 ?
                            <TouchableOpacity style={{
                                flex: 1,
                                padding: 10,
                                margin: 5,
                                backgroundColor: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => props.state.setUserModal(true, true)}
                            >
                                <Text>수락</Text>
                            </TouchableOpacity> :
                            <></>
                        }
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
    /*
        <Content props={props} />
        <FlatListImage props={props} />
        <Question props={props} />      
    */
}

export default SubPartyDatailProfilePresenter;

const Profile = ({ props }) => {
    return (
        <View style={{
            position: 'absolute',
            zIndex: 100,
            left: 40,
            top: 0,
        }}>
            <View style={{
                height: 140,
                aspectRatio: 1,
                borderRadius: 100,
                overflow: 'hidden',
                backgroundColor: 'white',
            }}>
                <Image
                    style={{
                        flex: 1,
                        resizeMode: 'stretch',
                    }}
                    source={{
                        uri: props.state.imageData[0]
                    }}
                />
            </View>
            <View style={{
                position: 'absolute',
                backgroundColor: 'blue',
                height: 35,
                width: 100,
                bottom: 0,
                borderRadius: 30,
                alignSelf: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: 'white',
                    alignSelf: 'center',
                }}>서류평가</Text>
            </View>
        </View>
    );
}

const FlatListImage = ({ props }) => {
    
    return (
        <View style={{
            flex: 1,
            marginBottom: 10,
            //padding: 10,
            //backgroundColor: 'red',
        }}>
            <LinearGradient
                style={{
                    //position: 'absolute',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
                colors={[0, 40, 60, 100]}>
                {
                    props.state.imageData.map(x => (<Icon name='dot-fill' size={20} style={styles.bubble} color='gray' />))
                }
            </LinearGradient>

            <FlatList
                //ref={props.state.myRef}
                data={props.state.imageData}
                horizontal={true}
                pagingEnabled={true}
                snapToInterval={windowWidth-20}
                decelerationRate="fast"
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style={{ width: 0 }} />
                )}
                //onScroll={evt => props.state.imgSwipe(evt.nativeEvent)}
                numColumns={1}
                initialNumToRender={1}
                renderItem={item => ImageSwipe({ item })}
            />
        </View>
    );
}

const ImageSwipe = ({ item }) => {
    //console.log(item.index);
    return (
        <View style={{
            //flex: 1,
            //marginLeft: 5,
            //marginRight: 5,
            //marginBottom: 5,
            //height: parseInt(windowHeight / 2),
            width: parseInt(windowWidth)-30,
            aspectRatio: 1,
            //width: '100%',
        }}
            key={'profile_'+item.index}
        >
            <ImageBackground
                style={{
                    flex: 1,
                    //aspectRatio: 1,
                }}
                imageStyle={{
                    resizeMode: 'stretch',
                    //resizeMode: 'contain',
                }}
                /*source={{
                    uri: props.state.getImg()
                }}*/
                source={{
                    uri: item.item
                }}
            >

                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                }}
                >
                    <TouchableOpacity style={{
                        flex: 1,
                    }}
                    //onPress={() => props.state.leftImg()}
                    />
                    <TouchableOpacity style={{
                        flex: 1,
                    }}
                    //onPress={() => props.state.rightImg()}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const Content = ({props}) => {
    const user = props.state.userData;

    let birth, year = 0;
    if(user.birth != undefined) {
        year = parseInt(new Date().getFullYear()+100).toString().slice(1,4);
        birth = parseInt(user.birth.slice(0,2));
    }

    let phone = props.state.selectedUser.phone;
    if(phone != undefined || phone != null ) {
        phone = props.state.selectedUser.phone;
        phone = phone.slice(0,3) + '-' + phone.slice(3,7) + '-' + phone.slice(7,11);
    }
    
    return (
        <View>
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={{
                    marginLeft: 10,
                }}>
                    {user.nickname}
                </Text>
                <Text style={{
                    marginLeft: 10,
                }}>
                    {(year-birth)%100 + 1+'살'}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <Text style={{
                    marginLeft: 10,
                }}>
                    {user.live}
                </Text>
                <Text style={{
                    marginLeft: 10,
                }}>
                    직업
                </Text>
            </View>

            <View style={{
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    margin: 20,
                }}>
                    <Image style={{ height: 70, width: 70, }} source={require('../img/1.png')} />
                    <Image style={{ height: 70, width: 70, }} source={require('../img/2.png')} />
                    <Image style={{ height: 70, width: 70, }} source={require('../img/3.png')} />
                    <Image style={{ height: 70, width: 70, }} source={require('../img/4.png')} />
                    <Image style={{ height: 70, width: 70, }} source={require('../img/5.png')} />
                </View>

            </View>

            {/* 자기소개 */}
            <View style={{
                padding: 10,
                margin: 5,
            }}>
                <Text style={{
                    fontSize: 20,
                    marginBottom: 5,
                }}>자기소개</Text>
                <View style={{
                    minHeight: 100,
                }}>
                    <Text>{user.selfintro}</Text>
                </View>

                {
                    props.state.selectedUser.attend == 1 ?
                    <TouchableOpacity style={{
                        padding: 20,
                        backgroundColor: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                        onPress={() => {
                            Alert.alert(
                                "상대방 번호를 오픈할까요?",
                                "번호 오픈에는 20캔디가 소모돼요!",
                                [
                                  {
                                    text: "아니요",
                                    //onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                  },
                                  { text: "네", onPress: () => props.state.getPhone() }
                                ]
                              );
                        }}
                    >
                        <Text>번호 보기</Text>
                    </TouchableOpacity> :
                    props.state.selectedUser.attend == 2 ?
                    <View style={{
                        padding: 15,
                        backgroundColor: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 18,
                            letterSpacing: 1,
                            fontWeight: '700'
                        }}>{phone}</Text>
                    </View> :
                    <></>
                }
            </View>


            {/* 기본정보 */}
            <View style={{
                padding: 10,
                margin: 5,
            }}>
                <Text style={{
                    fontSize: 20,
                    marginBottom: 5,
                }}>기본정보</Text>
                
                {/* 1 */}
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 50,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>직장</Text>
                        <Text style={{
                            flex: 2,
                        }}>삼성전자</Text>
                        <Text style={{
                            textAlign: 'right',
                            flex: 1,
                        }}>인증</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>대학교</Text>
                        <Text style={{
                            flex: 2,
                        }}>{user.eduname}</Text>
                        <Text style={{
                            textAlign: 'right',
                            flex: 1,
                        }}>인증</Text>
                    </View>
                </View>

                {/* 3 */}
                <View style={{
                    marginTop: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>학력</Text>
                        <Text style={{
                            flex: 3,
                        }}>{user.edu}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>성격</Text>
                        <Text style={{
                            flex: 3,
                        }}>{user.character}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>키</Text>
                        <Text style={{
                            flex: 2,
                        }}>{user.height}</Text>
                        <Text style={{
                            textAlign: 'right',
                            flex: 1,
                        }}>인증</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>체형</Text>
                        <Text style={{
                            flex: 3,
                        }}>{user.body}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>음주</Text>
                        <Text style={{
                            flex: 3,
                        }}>{user.alcohol}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>흡연</Text>
                        <Text style={{
                            flex: 3,
                        }}>{user.smoke}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                        }}>종교</Text>
                        <Text style={{
                            flex: 3,
                        }}>{user.religion}</Text>
                    </View>
                </View>


            </View>
        </View>
    );
}

const Question = ({props}) => {
    const user = props.state.userData;
    return(
        <View style={{
            padding: 10,
        }}>
            <View>
                <View style={{

                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'green'
                    }}>Q.취미</Text>
                </View>
                <View style={{
                    minHeight: 50,
                    padding: 5,
                }}>
                    <Text>{user.hobby}</Text>
                </View>
            </View>

            <View>
                <View style={{

                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'green'
                    }}>Q.관심사</Text>
                </View>
                <View style={{
                    minHeight: 50,
                    padding: 5,
                }}>
                    <Text>{user.interest}</Text>
                </View>
            </View>

            <View>
                <View style={{
                    
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'green'
                    }}>Q.데이트 스타일</Text>
                </View>
                <View style={{
                    minHeight: 50,
                    padding: 5,
                }}>
                    <Text>{user.datestyle}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        //margin: 2,
    },
    bubble: {
        padding: 2,
    },
});
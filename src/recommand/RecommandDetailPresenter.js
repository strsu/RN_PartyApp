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
    ImageBackground,
    ScrollView,
    Pressable
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FlatListSlider from '../util/flatlistSlider/FlatListSlider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function RecommandDetailPresenter(props) {
    console.log('@RecommandDetailPresenter');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}
            showsVerticalScrollIndicator={false}
            >
                <Profile />
                <View style={{
                    flex: 1,
                    margin: 10,
                    //padding: 5,
                    paddingTop: 100,
                    marginTop: 80,
                    borderWidth: 4,
                    borderRadius: 20,
                    borderColor: 'black',
                }}>

                    <Content props={props} />
                    <FlatListImage props={props} />
                    <Question props={props} />
                </View>


            </ScrollView>

        </SafeAreaView>
    );
}

export default RecommandDetailPresenter;

{/*
                일단 이렇게 하면 스와이프 가능
                <GestureHandlerRootView>
                    <PanGestureHandler
                        onGestureEvent={(evt) => {
                            console.log(evt.nativeEvent);
                        }}
                    >
                        <View style={{
                            height: parseInt(windowHeight/2),
                            backgroundColor: 'red',
                        }}>
                            <Image>

                            </Image>
                        </View>
                    </PanGestureHandler>
                </GestureHandlerRootView>*/}

const Profile = () => {
    return (
        <View style={{
            position: 'absolute',
            zIndex: 100,
            left: 40,
            top: 0,
        }}>
            <View style={{
                height: 160,
                width: 160,
                borderRadius: 100,
                backgroundColor: 'red',
            }}>

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
                ref={props.state.myRef}
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

            <View style={{
                //position: 'absolute',
                //backgroundColor: 20,
            }}
                // 아래 두 props를 쓰면 터치를 감지할 수 있다.
                // https://reactnative.dev/docs/gesture-responder-system
                // https://eveningkid.medium.com/the-basics-of-react-native-gestures-23061b5e89cf
                onStartShouldSetResponder={() => true}
                onResponderMove={(evt) => props.state.rateCalc(evt.nativeEvent.pageX)}
                onResponderRelease={() => console.log('off')}
            >
                <LinearGradient colors={[100, 50, 30, 10, 0]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <Icon name='star' size={50} />
                        <Icon name='star' size={50} />
                        <Icon name='star' size={50} />
                        <Icon name='star' size={50} />
                        <Icon name='star' size={50} />
                    </View>
                </LinearGradient>
            </View>
        </View>
    );
}

const ImageSwipe = ({ item }) => {
    console.log(item.index);
    return (
        <View style={{
            flex: 1,
            //marginLeft: 5,
            //marginRight: 5,
            //marginBottom: 5,
            height: parseInt(windowHeight / 2),
            width: parseInt(windowWidth)-20,
            //width: '100%',
        }}
        >
            <ImageBackground
                style={{
                    flex: 2.5,
                }}
                imageStyle={{}}
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
    return (
        <View>
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={{
                    marginLeft: 10,
                }}>
                    닉네임
                </Text>
                <Text style={{
                    marginLeft: 10,
                }}>
                    나이
                </Text>
            </View>

            <View style={{
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <Text style={{
                    marginLeft: 10,
                }}>
                    지역
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
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>n시간 후에 카드가 삭제됩니다.</Text>
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
                    <Text>자기소개</Text>
                </View>
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
                        }}>울림대학교</Text>
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
                        }}>대학교 졸업</Text>
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
                        }}>차분한, 낙천적인, 상냥한</Text>
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
                        }}>176</Text>
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
                        }}>슬림한</Text>
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
                        }}>가끔 마셔요</Text>
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
                        }}>비흡연</Text>
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
                        }}>무교</Text>
                    </View>
                </View>


            </View>
        </View>
    );
}

const Question = ({props}) => {
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
                    <Text>내용</Text>
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
                    <Text>내용</Text>
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
                    <Text>내용</Text>
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
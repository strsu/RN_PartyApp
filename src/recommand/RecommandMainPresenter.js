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
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function RecommandMainPresenter(props) {
    console.log('@RecommandMainPresenter');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>

                <FlatList
                    data={props.state.userData}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={item => boardCard({props}, {item})}
                    snapToInterval={parseInt(windowHeight * 0.8)+20}
                    //numColumns={2}
                    ListFooterComponent={() => {
                        return (
                            <View style={{
                                height: 200,
                                marginTop: props.state.userData.length > 2 ? 10 : 100,
                            }}>
                                <TouchableOpacity style={{
                                    height: 60,
                                    backgroundColor: 80,
                                    //padding: 10,
                                    margin: 10,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            marginRight: 5,
                                            fontSize: 17,
                                            fontWeight: 'bold',
                                            color: 'green',
                                        }}>추가카드 받기</Text>
                                        <Icon name='heart' size={20} />
                                    </View>
                                </TouchableOpacity>
                            </View>)
                    }}
                />

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
            </View>
        </SafeAreaView>
    );
}

const boardCard = ({props}, item) => {
    const index = item.item.index;
    console.log(props.state.userData[index]);
    return (
        <View style={{
            height: parseInt(windowHeight * 0.8),
            flex: 1,
            backgroundColor: 'white',
            elevation: 3,
            margin: 10,            
            borderRadius: 10,
        }}>
            <TouchableOpacity style={{
                flex: 1,
            }}
                onPress={() => {props.props.navigation.navigate("RecommandDetail", {params: props.state.userData[index]}) }}
            >
                <ImageBackground
                    style={{
                        flex: 10,
                    }}
                    imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, }}
                    source={{
                        uri: item.item.item //uri: props.state.getImg()
                    }}
                >
                </ImageBackground>
                <View style={{
                    flex: 3,
                    paddingTop: 5,
                    paddingRight: 10,
                    paddingLeft: 10,
                    paddingBottom: 10,
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <View style={{
                            marginBottom: 2,
                        }}>
                            <Text>닉네임</Text>
                        </View>
                        <View style={{
                            marginBottom: 2,
                        }}>
                            <Text>나이 / 지역</Text>
                        </View>
                        <View style={{
                            marginBottom: 2,
                        }}>
                            <Text>직업</Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                        <Icon name='heart' size={25} />
                        <Icon name='heart' size={25} />
                        <Icon name='heart' size={25} />
                    </View>
                </View>
            </TouchableOpacity>

        </View>

    );
}

export default RecommandMainPresenter;

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
});
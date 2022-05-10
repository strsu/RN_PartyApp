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
    ScrollView
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileMainPresenter(props) {
    console.log('@ProfileMainPresenter');

    const navigation = props.props.navigation;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}>
                <View style={{
                    alignItems: 'center',
                    margin: 10,
                }}>
                    <TouchableOpacity style={{
                    }}>
                        <View style={{
                            position: 'absolute',
                            height: 180,
                            width: 180,
                            borderRadius: 100,
                            backgroundColor: 'blue',
                        }} />
                        <View style={{
                            position: 'absolute',
                            width: 180,
                            height: 180,
                            borderLeftWidth: 80,
                            borderRightWidth: 80,
                            borderBottomWidth: 80,
                            borderRadius: 100,
                            borderStyle: 'solid',
                            borderBottomColor: 'green',
                            backgroundColor: 'transparent',
                            borderLeftColor: 'transparent',
                            borderRightColor: 'transparent',
                            transform: [{
                                rotateZ: '270deg',
                            }]
                        }} />
                        <Image
                            style={{
                                margin: 10,
                                height: 160,
                                width: 160,
                                borderRadius: 100,
                                backgroundColor: 'red',
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        marginTop: 10,
                        fontSize: 25,
                        fontWeight: 'bold',
                    }}>닉네임</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    margin: 10,
                }}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                    }}
                        onPress={() => navigation.navigate('ProfileAuth')}
                    >
                        <View style={{
                            backgroundColor: 'white',
                            elevation: 5,
                            height: 60,
                            width: 60,
                            borderRadius: 100,
                        }}>

                        </View>
                        <Text>뱃지</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{
                        alignItems: 'center',
                    }}
                        onPress={() => navigation.navigate('ProfileModify')}
                    >
                        <View style={{
                            backgroundColor: 'white',
                            elevation: 5,
                            height: 80,
                            width: 80,
                            borderRadius: 100,
                            marginRight: 30,
                            marginLeft: 30,
                        }}>

                        </View>
                        <Text>프로필 수정</Text>
                    </TouchableOpacity>

                    <View style={{
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: 'red',
                            height: 60,
                            width: 60,
                            borderRadius: 100,
                        }}>

                        </View>
                        <Text>울림샵</Text>
                    </View>
                </View>
                
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 10,
                    padding: 10,
                    marginBottom: 2,
                }}>
                    <Text>쿠폰함</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 10,
                    padding: 10,
                    marginBottom: 2,
                }}>
                    <Text>공지사항</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 10,
                    padding: 10,
                    marginBottom: 2,
                }}>
                    <Text>지인 연락처 차단</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 10,
                    padding: 10,
                    marginBottom: 2,
                }}>
                    <Text>설정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 10,
                    padding: 10,
                    marginBottom: 2,
                }}>
                    <Text>초대</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }}>
                    <Image 
                        style={{
                            width: '100%',
                            resizeMode: 'contain',
                        }}
                        source={require('../banner.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 10,
                    padding: 10,
                    marginBottom: 2,
                }}>
                    <Text>문의하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 10,
                    padding: 10,
                    marginBottom: 2,
                }}>
                    <Text>울림이란?</Text>
                </TouchableOpacity>


            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileMainPresenter;

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
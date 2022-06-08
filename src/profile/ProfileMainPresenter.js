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
import useStore from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileMainPresenter(props) {
    console.log('@ProfileMainPresenter');

    const navigation = props.props.navigation;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginBottom: 15,
                }}>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            elevation: 3,
                            height: 80,
                            width: 80,
                            borderRadius: 100,
                            marginBottom: 5,
                        }}>

                        </TouchableOpacity>
                        <Text>인증</Text>
                    </View>

                    <View style={{
                        alignItems: 'center',
                        margin: 10,
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            borderRadius: 100,
                            elevation: 3,
                            marginBottom: 5,
                        }}
                        onPress={() => navigation.navigate('ProfileModify')}
                        >
                            <Image
                                style={{
                                    height: 140,
                                    aspectRatio: 1,
                                    borderRadius: 100,
                                    resizeMode: 'cover',
                                }}
                                source={{uri: useStore.getState().picURL + useStore.getState().mainPic}}
                            />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>{useStore.getState().nickname}</Text>
                    </View>

                    <View style={{
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            elevation: 3,
                            height: 80,
                            width: 80,
                            borderRadius: 100,
                            marginBottom: 5,
                        }}>

                        </TouchableOpacity>
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
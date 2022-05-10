import React, { useState } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Pressable
}
    from 'react-native'

import AuthImagePicker from './AuthImagePicker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AuthPresenter_gangnamAPT(props) {
    console.log('@AuthPresenter_gangnamAPT');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}>

                <View style={{
                    height: 80,
                    backgroundColor: 30,
                    padding: 20,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'green',
                        marginBottom: 10,
                    }}>인증 기준</Text>
                    <Text style={{

                    }}>네이버 부동산 시세 기준 20억 원 이상 아파트</Text>
                </View>

                <View style={{
                    height: 100,
                    backgroundColor: 30,
                    padding: 20,
                    margin: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'green',
                        marginBottom: 10,
                    }}>인증 기준</Text>
                    <Text style={{
                        marginBottom: 5,
                    }}>필수 1) 네이버 부동산 실거래가 캡쳐화면</Text>
                    <Text style={{

                    }}>필수 2) 이름, 사진, 주소가 나온 신분증 또는 등본</Text>
                </View>

                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'green',
                        marginBottom: 10,
                    }}>인증 예시</Text>
                    <Image
                        style={{
                            width: windowWidth - 20,
                            height: 550,
                            resizeMode: 'contain',
                        }}
                        source={require('../img/car.jpg')}
                    />
                </View>


                <View style={{
                    height: 100,
                    backgroundColor: 30,
                    padding: 20,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'green',
                        marginBottom: 10,
                    }}>인증 주의사항</Text>
                    <Text style={{
                        marginBottom: 5,
                    }}>필수 1) 네이버 부동산 실거래가 캡쳐화면</Text>
                    <Text style={{

                    }}>필수 2) 이름, 사진, 주소가 나온 신분증 또는 등본</Text>
                </View>

                <AuthImagePicker cls='gangnamAPT'/>

            </ScrollView>
        </SafeAreaView>
    );
}

export default AuthPresenter_gangnamAPT;


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
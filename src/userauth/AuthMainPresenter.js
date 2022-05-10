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
    ScrollView,
    Pressable,
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { useAuth } from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AuthMainPresenter(props) {
    console.log('@AuthMainPresenter', props.state.isJudging, useAuth.getState().isJudging);
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}>                
                <View style={{
                    backgroundColor: 'white',
                }}>
                    <View style={{
                        alignItems: 'center',
                        padding: 10,
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'black',
                        }}>울림 인증</Text>
                    </View>

                    <View style={{
                        padding: 20,
                    }}>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: 'green',
                            }}>프로필 인증 안내</Text>
                        </View>
                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontSize: 15,
                            }}>여성분들의 경우 다음을 누르시면 외모 평가로 넘어가게됩니다. 평가 심사 후 합격하면 최종 가입이 완료입니다.</Text>
                        </View>
                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontSize: 15,
                            }}>남성분들의 경우 인증 심사를 받으셔야만 최종 가입이 완료됩니다.</Text>
                        </View>
                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontSize: 15,
                            }}>20대 남성분들의 경우 키 인증 후 외모평가를 받아 합격하면 최종 가입이 완료됩니다.</Text>
                        </View>
                    </View>

                    <Separator title={'프로필'} />
                    <ImageUploader title={'프로필사진 올리기'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_Face"} />

                    <Separator title={'직업'} />
                    <ImageUploader title={'전문직'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_professional"} /> 
                    <ImageUploader title={'사업가'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_businessman"} />

                    <Separator title={'소득'} />
                    <ImageUploader title={'고액 연봉'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_highSalary"} />
                    <ImageUploader title={'억대 연봉'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_100million"} />

                    <Separator title={'거주지'} />
                    <ImageUploader title={'강남 거주'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_gangnamAPT"} />
                    <ImageUploader title={'고가 아파트'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_expensiveAPT"} />

                    <Separator title={'차량'} />
                    <ImageUploader title={'외제차 오너'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_foreignCar"} />
                    <ImageUploader title={'슈퍼카 오너'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_SuperCar"} />

                    <Separator title={'자산'} />
                    <ImageUploader title={'고액 자산'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_HighAsset"} />
                    <ImageUploader title={'초고액 자산'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_ultraHighAsset"} />

                    <Separator title={'집안'} />
                    <ImageUploader title={'엘리트 집안'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_eliteFamily"} />
                    <ImageUploader title={'제력가 집안'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_highCaliberFamily"} />

                    <Separator title={'학벌'} />
                    <ImageUploader title={'명문대'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_prestigiousUniv"} />
                    <ImageUploader title={'해외 명문대'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_aboardPrestigiousUniv"} />
                    <ImageUploader title={'외모 심사 (키 179↑)'} state={props.state} move={props.props.navigation.navigate} screen={"Auth_height"} />

                </View>

                <Pressable style={{
                    backgroundColor: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 15,
                }}
                    onPress={() => props.state.verify()}
                >
                    <Text style={{
                        fontSize: 20,
                        color: 'black',
                    }}>{props.state.isJudging ? '심사중' : props.state.isPass ? '울림 시작하기' : '심사요청'}</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AuthMainPresenter;

const ImageUploader = (props) => {
    return (
        <Pressable style={{
            flexDirection: 'row',
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: 
                props.screen == 'Auth_Face' && props.state.isReturnedPic != '' ? 'red' : 
                props.screen == 'Auth_professional' && props.state.isReturnedProfessional != '' ? 'red' : 
                props.screen == 'Auth_businessman' && props.state.isReturnedBusinessman != '' ? 'red' : 
                props.screen == 'Auth_highSalary' && props.state.isReturnedHighSalary != '' ? 'red' : 
                props.screen == 'Auth_100million' && props.state.isReturnedA100million != '' ? 'red' : 
                props.screen == 'Auth_gangnamAPT' && props.state.isReturnedGangnamAPT != '' ? 'red' : 
                props.screen == 'Auth_expensiveAPT' && props.state.isReturnedExpensiveAPT != '' ? 'red' : 
                props.screen == 'Auth_foreignCar' && props.state.isReturnedForeignCar != '' ? 'red' : 
                props.screen == 'Auth_SuperCar' && props.state.isReturnedSuperCar != '' ? 'red' : 
                props.screen == 'Auth_HighAsset' && props.state.isReturnedHighAsset != '' ? 'red' : 
                props.screen == 'Auth_ultraHighAsset' && props.state.isReturnedUltraHighAsset != '' ? 'red' : 
                props.screen == 'Auth_eliteFamily' && props.state.isReturnedEliteFamily != '' ? 'red' : 
                props.screen == 'Auth_highCaliberFamily' && props.state.isReturnedHighCaliberFamily != '' ? 'red' : 
                props.screen == 'Auth_prestigiousUniv' && props.state.isReturnedPrestigiousUniv != '' ? 'red' : 
                props.screen == 'Auth_aboardPrestigiousUniv' && props.state.isReturnedAboardPrestigiousUniv != '' ? 'red' : 
                props.screen == 'Auth_height' && props.state.isReturnedHeight != '' ? 'red' : 'white',
            opacity: 
                props.screen == 'Auth_Face' && props.state.isReturnedPic != '' ? 0.5 : 
                props.screen == 'Auth_professional' && props.state.isReturnedProfessional != '' ? 0.5 : 
                props.screen == 'Auth_businessman' && props.state.isReturnedBusinessman != '' ? 0.5 : 
                props.screen == 'Auth_highSalary' && props.state.isReturnedHighSalary != '' ? 0.5 : 
                props.screen == 'Auth_100million' && props.state.isReturnedA100million != '' ? 0.5 : 
                props.screen == 'Auth_gangnamAPT' && props.state.isReturnedGangnamAPT != '' ? 0.5 : 
                props.screen == 'Auth_expensiveAPT' && props.state.isReturnedExpensiveAPT != '' ? 0.5 : 
                props.screen == 'Auth_foreignCar' && props.state.isReturnedForeignCar != '' ? 0.5 : 
                props.screen == 'Auth_SuperCar' && props.state.isReturnedSuperCar != '' ? 0.5 : 
                props.screen == 'Auth_HighAsset' && props.state.isReturnedHighAsset != '' ? 0.5 : 
                props.screen == 'Auth_ultraHighAsset' && props.state.isReturnedUltraHighAsset != '' ? 0.5 : 
                props.screen == 'Auth_eliteFamily' && props.state.isReturnedEliteFamily != '' ? 0.5 : 
                props.screen == 'Auth_highCaliberFamily' && props.state.isReturnedHighCaliberFamily != '' ? 0.5 : 
                props.screen == 'Auth_prestigiousUniv' && props.state.isReturnedPrestigiousUniv != '' ? 0.5 : 
                props.screen == 'Auth_aboardPrestigiousUniv' && props.state.isReturnedAboardPrestigiousUniv != '' ? 0.5 : 
                props.screen == 'Auth_height' && props.state.isReturnedHeight != '' ? 0.5 : 1,
        }}
            onPress={() => props.move(props.screen)}
        >
            <Icon name='bell' size={25} />
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 10,
            }}>
                <Text style={{
                    marginLeft: 5,
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                }}>{props.title}</Text>
                <Text style={{
                    marginLeft: 5,
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                }}>
                    {
                        (props.screen == 'Auth_Face' && props.state.isReturnedPic != '' ? '<반려>' : 
                        props.screen == 'Auth_professional' && props.state.isReturnedProfessional != '' ? '<반려>' : 
                        props.screen == 'Auth_businessman' && props.state.isReturnedBusinessman != '' ? '<반려>' : 
                        props.screen == 'Auth_highSalary' && props.state.isReturnedHighSalary != '' ? '<반려>' : 
                        props.screen == 'Auth_100million' && props.state.isReturnedA100million != '' ? '<반려>' : 
                        props.screen == 'Auth_gangnamAPT' && props.state.isReturnedGangnamAPT != '' ? '<반려>' : 
                        props.screen == 'Auth_expensiveAPT' && props.state.isReturnedExpensiveAPT != '' ? '<반려>' : 
                        props.screen == 'Auth_foreignCar' && props.state.isReturnedForeignCar != '' ? '<반려>' : 
                        props.screen == 'Auth_SuperCar' && props.state.isReturnedSuperCar != '' ? '<반려>' : 
                        props.screen == 'Auth_HighAsset' && props.state.isReturnedHighAsset != '' ? '<반려>' : 
                        props.screen == 'Auth_ultraHighAsset' && props.state.isReturnedUltraHighAsset != '' ? '<반려>' : 
                        props.screen == 'Auth_eliteFamily' && props.state.isReturnedEliteFamily != '' ? '<반려>' : 
                        props.screen == 'Auth_highCaliberFamily' && props.state.isReturnedHighCaliberFamily != '' ? '<반려>' : 
                        props.screen == 'Auth_prestigiousUniv' && props.state.isReturnedPrestigiousUniv != '' ? '<반려>' : 
                        props.screen == 'Auth_aboardPrestigiousUniv' && props.state.isReturnedAboardPrestigiousUniv != '' ? '<반려>' : 
                        props.screen == 'Auth_height' && props.state.isReturnedHeight != '' ? '<반려>' : '')
                    }
                </Text>
                <Icon name='x' size={15} />
            </View>
        </Pressable>
    );
}

const Separator = (props) => {
    return (
        <View style={{
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            marginBottom: 5,
        }}>
            <Text style={{
                padding: 10,
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
            }}>{props.title}</Text>
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
        margin: 2,
    },
});
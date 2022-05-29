import React, { useRef } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { useRegister } from '../../AppContext';
import { useIsFocused } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function EmailPresenter(props) {
    console.log('@EmailPresenter');

    const pw1 = useRef(null);
    const pw2 = useRef(null);

    // 최종 회원가입 후 이곳으로 돌아오면 init화면으로 넘긴다.
    // 스택을 계속 쌓지 않기 위해서!
    const isFocused = useIsFocused();
    React.useEffect(() => {
        if (isFocused && useRegister.getState().registerFinish) {
            props.props.navigation.pop();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        padding: 20,
                        flex: 1,
                    }}>
                        <View style={{
                            flex: 1,
                            marginTop: 40,
                        }}>
                            <TextInput
                                style={{
                                    height: 60,
                                    backgroundColor: 'white',
                                    elevation: 3,
                                    borderWidth: 1,
                                    borderColor: 50,
                                }}
                                placeholder='이메일을 입력해주세요.'
                                onChangeText={val => props.state.setEmail(val)}
                                onSubmitEditing={() => pw1.current.focus()}
                                keyboardType='email-address'
                                // Remember to set blurOnSubmit to false, to prevent keyboard flickering.
                                blurOnSubmit={false}
                            />

                            <TextInput
                                style={{
                                    height: 60,
                                    backgroundColor: 'white',
                                    marginTop: 5,
                                    elevation: 3,
                                    borderWidth: 1,
                                    borderColor: 50,
                                }}
                                ref={pw1}
                                placeholder='비밀번호를 입력해주세요.'
                                onChangeText={val => props.state.setPassWord(val)}
                                secureTextEntry={true}
                                onSubmitEditing={() => pw2.current.focus()}
                                blurOnSubmit={false}
                            />

                            <TextInput
                                style={{
                                    height: 60,
                                    backgroundColor: props.state.compare() ? 'white' : '#ff968a',
                                    marginTop: 5,
                                    elevation: 3,
                                    borderWidth: 1,
                                    borderColor: 50,
                                }}
                                ref={pw2}
                                placeholder='비밀번호를 한 번 더 입력해주세요.'
                                secureTextEntry={true}
                                onChangeText={val => props.state.setPassWordConfirm(val)}
                            />

                            <View style={{
                                alignItems: 'center',
                                marginTop: 20,
                            }}>
                                <Text style={{
                                }}>이메일은 로그인 및 아이디/비밀번호 찾기에 사용됩니다.</Text>
                                <Text style={{
                                    marginTop: 10,
                                }}>최소 1개 이상의 문자,숫자,특수문자를 이용해</Text>
                                <Text style={{
                                }}>8자리 이상의 비밀번호를 설정해주세요</Text>
                            </View>
                        </View>


                        <TouchableOpacity style={{
                            //flex: 2,
                            height: 60,
                            backgroundColor: 'gray',
                            marginBottom: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={() => props.state.compare() ? props.state.verify() : {}}
                        >
                            <Text style={{
                                fontSize: 25,
                            }}>다음</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default EmailPresenter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //backgroundColor: '#b6cfb6'
        //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
    },
});
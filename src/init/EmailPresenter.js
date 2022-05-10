import React, {useRef} from 'react';
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
        if(isFocused && useRegister.getState().registerFinish) {
            props.props.navigation.pop();
        }       
    }, [isFocused]);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                    <View style={{
                        padding: 20,
                    }}>
                        <View style={{
                            alignItems: 'center',
                            marginBottom: 20,
                        }}>
                            <Text style={{
                            }}>정보를 입력하고, 가입 버튼을 눌러주세요.</Text>
                        </View>

                        <TextInput
                            style={{
                                height: 60,
                                backgroundColor: 'white',
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
                            }}
                            ref={pw2}
                            placeholder='비밀번호를 한 번 더 입력해주세요.'
                            secureTextEntry={true}
                            onChangeText={val => props.state.setPassWordConfirm(val)}
                        />

                        <TouchableOpacity style={{
                            height: 60,
                            backgroundColor: 'gray',
                            marginTop: 200,
                            marginBottom: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={() => props.state.compare() ? props.state.verify() : {}}
                        >
                            <Text style={{
                                fontSize: 25,
                            }}>{props.state.compare() ? '다음' : '빈칸을 확인해주세요'}</Text>
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
      justifyContent: 'center',
      backgroundColor: '#b6cfb6'
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
    },
});
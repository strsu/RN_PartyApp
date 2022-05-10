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
    Dimensions,
    Pressable
}
from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import { useAuth } from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function LoginPresenter(props) {
    console.log('@LoginPresenter');

    const pw = useRef(null);
    const isFocused = useIsFocused();    
    React.useEffect(() => {
        if(isFocused) {
            if(!useAuth.getState().isJudging && useAuth.getState().isPass) props.state.verify();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View>
                    <View style={{
                        height: 60,
                        marginLeft: 40,
                        marginRight: 40,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                    }}>
                        <TextInput
                            style={{
                            }}
                            placeholder='이메일'
                            onChangeText={val => props.state.setID(val)}
                            returnKeyType='next'
                            onSubmitEditing={() => pw.current.focus()}
                        />
                    </View>

                    <View style={{
                        height: 60,
                        marginLeft: 40,
                        marginRight: 40,
                        marginTop: 10,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                    }}>
                        <TextInput 
                            ref={pw}
                            placeholder='패스워드'
                            onChangeText={val => props.state.setPW(val)}
                            returnKeyType='done'
                        />
                    </View>
                </View>

                <Pressable style={{
                    height: 60,
                    backgroundColor: 'red',
                    margin: 40,
                }}
                    onPress={() => props.state.verify()}
                >

                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default LoginPresenter;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ''
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
        justifyContent: 'flex-end',
    },
});
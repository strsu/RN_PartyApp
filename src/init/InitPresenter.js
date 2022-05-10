import React, {useState} from 'react';
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
    Animated
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { useIsFocused } from '@react-navigation/native';
import useStore, { useRegister, useAuth } from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function InitPresenter(props) {
    console.log('@InitPresenter');

    const isFocused = useIsFocused();    
    React.useEffect(() => {
        if(isFocused) {
            if(useRegister.getState().registerFinish && useStore.getState().grade == 'N') props.props.navigation.navigate('AuthScreen');
            if(!useAuth.getState().isJudging && useAuth.getState().isPass) props.props.navigation.navigate('contentNavi');
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>

                <Animated.View style={props.state._getStyle()}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginBottom: 100,
                    }}>
                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: parseInt(windowWidth/2),
                                backgroundColor: 'red',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 10,
                                borderRadius: 20,
                            }}
                            onPress={() => props.props.navigation.navigate('RegisterNavigator')}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                            }}>울림 시작하기</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: parseInt(windowWidth/2),
                                backgroundColor: 'red',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                            }}
                            onPress={() => props.props.navigation.navigate('Login')}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                            }}>로그인 하기</Text>
                        </TouchableOpacity>

                    </View>
                </Animated.View>

                <Animated.View style={props.state._getStyle_move()}>
                    <Icon name='heart-fill' size={35} />
                </Animated.View>
                
            </View>
        </SafeAreaView>
    );
}

export default InitPresenter;

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
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
    Pressable,
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { useRegister } from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function IntroducePresenter(props) {
    console.log('@IntroducePresenter');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={{
                    backgroundColor: 'white',
                    margin: 5,
                    elevation: 3,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray',
                    }}>
                        <Text style={{
                            marginLeft: 10,
                        }}>저의 성격은</Text>
                        <Text style={{
                            marginRight: 10,
                        }}>{props.state.character.length}</Text>
                    </View>
                    
                    <TextInput
                        style={{
                            height: parseInt(windowHeight/4)
                        }}
                        multiline
                        textAlignVertical='top'
                        numberOfLines={200}
                        onChangeText={text => props.state.setCharacter(text)}
                    />
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>자신에 대한 이야기를 통해 이성에게 매력을 어필해보세요.</Text>
                    <Text>정성스러울수록 상대방에게 호감을 받을 확률도 올라갑니다.</Text>
                </View>

                <View style={{
                    backgroundColor: 'white',
                    margin: 5,
                    elevation: 3,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray',
                    }}>
                        <Text style={{
                            marginLeft: 10,
                        }}>저를 소개합니다.</Text>

                        <Text style={{
                            marginRight: 10,
                        }}>{props.state.aboutMe.length}</Text>
                    </View>
                    <TextInput
                        style={{
                            height: parseInt(windowHeight/4),
                        }}
                        multiline
                        textAlignVertical='top'
                        numberOfLines={200}
                        onChangeText={text => props.state.setAboutMe(text)}
                    />
                </View>

                <Pressable
                    style={{
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#a6c1ee',
                    margin: 5,
                    marginTop: 10,
                    }}
                    onPress={() => props.state.verify()}
                >
                    <Text style={styles.textStyle}>가입하기</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
}

export default IntroducePresenter;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
        justifyContent: 'space-between'
    },
});
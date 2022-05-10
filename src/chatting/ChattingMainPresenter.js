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
    Dimensions
}
from 'react-native'
import { useChat } from '../../AppContext';

import Icon from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ChattingMainPresenter(props) {
    console.log('@ChattingMainPresenter');
    
    const ChatList = ({item}) => {
        return(
            <TouchableOpacity style={{
                height: 80,
                //backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
            }}
                onPress={() => props.props.navigation.navigate('ChattingDetail', {user: item})}
            >
                <View style={{
                    height: 60,
                    width: 60,
                    backgroundColor: 'blue',
                    margin: 10,
                    borderRadius: 22,
                }}>
    
                </View>
                <View style={{
                    marginLeft: 5,
    
                }}>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '600',
                            letterSpacing: 1,
                        }}>{item}</Text>
                    </View>
                    <View>
                        <Text>{Object(useChat.getState().conversation).value !== undefined ? useChat.getState().conversation[item][0].text : ''}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <FlatList 
                    data={useChat.getState().userList}
                    renderItem={ChatList}
                />
                <View style={{
                    height: 50,
                    backgroundColor: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <TextInput
                        style={{
                            flex: 1,
                        }}
                        onChangeText={text => props.state.setUser(text)}
                    />
                    <TouchableOpacity style={{
                        backgroundColor: 50,
                        height: '100%',
                        justifyContent: 'center',
                        padding: 10,
                    }}
                        onPress={()=>useChat.getState().sendMessage('chat', useChat.getState().userID, props.state.user+'@localhost')}
                    >
                        <Text>보내기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


export default ChattingMainPresenter;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
    },
});
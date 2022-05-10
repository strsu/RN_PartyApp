import React, {useState, useRef} from 'react';
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


import Icon from 'react-native-vector-icons/Octicons';
import { useChat } from '../../AppContext';
import shallow from 'zustand/shallow'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ChattingDetailPresenter(props) {
    console.log('@ChattingDetailPresenter');
    
    const data = useChat((state) => (state.conversation[props.state.userName]), shallow);
    const [chat, setChat] = useState('');
    const [cnt, setCnt] = useState(false);
    const scrollRef = useRef(null);

    useChat.subscribe( state => setCnt(state.conversation[props.state.userName] === undefined ? 0 : state.conversation[props.state.userName].length) ); // 어떤 상태가 변경되더라도 로그가 출력됨
    React.useEffect(() => {
        let a = 1;   
    }, [cnt]);

    const ChatList = ({item}) => {
        return(
            <Pressable style={{
                //minHeight: 40,
                flexDirection: 'row',
                //alignItems: 'center',
                justifyContent: item.own == '1' ? 'flex-end' : 'flex-start',
            }}
            >
                {
                    item.own == '1' ?
                    <></> :
                    <View style={{
                        backgroundColor: 'blue',
                        height: 40,
                        width: 40,
                        borderRadius: 15,
                        margin: 5,
                    }}>

                    </View>
                }
                <View style={{
                    backgroundColor: 'lightgray',
                    marginTop: 10,
                    justifyContent: 'center',
                    marginRight: item.own == '1' ? 5 : 50,
                    padding: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: item.own == '1' ? 0 : 10,
                    borderTopLeftRadius: item.own == '1' ? 10 : 0,
                }}>
                    <Text>{item.text}</Text>
                </View>
            </Pressable>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <FlatList
                    ref={scrollRef}
                    data={data === undefined ? [] : data}
                    //extraData={useChat.getState().conversation[props.state.userName]}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => scrollRef?.current?.scrollToEnd()} 
                    //initialScrollIndex={data.length - 10}
                    //initialNumToRender={20}
                    renderItem={ChatList}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                
                marginLeft: 10,
            }}>
                <View style={{
                    width: '90%',
                }}> 
                    <TextInput
                        multiline
                        onChangeText={newText => setChat(newText)}
                        style={{
                            textAlignVertical: 'top',
                        }}
                        returnKeyType='next'
                        value={chat}
                    />
                </View>
                <TouchableOpacity style={{
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '10%',
                }}
                    onPress={() => {
                        useChat.getState().sendMessage(chat, useChat.getState().userID, props.state.userName+'@localhost');
                        setChat('');
                        //setData(useChat.getState().conversation[props.state.userName]);
                        scrollRef.current.scrollToEnd({animated: true});
                    }}
                >
                    <Icon name="rocket" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default ChattingDetailPresenter;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
        backgroundColor: '#dfffde',
    },
});
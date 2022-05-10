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
    ScrollView,
    Pressable,
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileAuthPresenter(props) {
    console.log('@ProfileAuthPresenter');

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

                    <Separator title={'인증된 뱃지'}/>

                    <Separator title={'뱃지 추가 인증하기'}/>

                    <Separator title={'직업'}/>
                    <ImageUploader title={'전문직'} move={props.props.navigation.navigate} screen={"Auth_APT"} />
                    <ImageUploader title={'사업가'} move={props.props.navigation.navigate} screen={"Auth_APT"} />

                    <Separator title={'소득'}/>
                    <ImageUploader title={'고액 연봉'} move={props.props.navigation.navigate} screen={"Auth_APT"} />
                    <ImageUploader title={'억대 연봉'} move={props.props.navigation.navigate} screen={"Auth_APT"} />

                    <Separator title={'집'}/>
                    <ImageUploader title={'고가 아파트'} move={props.props.navigation.navigate} screen={"Auth_APT"} />
                    
                    <Separator title={'차량'}/>
                    <ImageUploader title={'외제차 오너'} move={props.props.navigation.navigate} screen={"Auth_APT"} />
                    <ImageUploader title={'슈퍼카 오너'} move={props.props.navigation.navigate} screen={"Auth_APT"} />

                    <Separator title={'학벌/외모 (20대 한정)'}/>
                    <ImageUploader title={'명문대'} move={props.props.navigation.navigate} screen={"Auth_APT"} />
                    <ImageUploader title={'해외 명문대'} move={props.props.navigation.navigate} screen={"Auth_APT"} />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileAuthPresenter;

const ImageUploader = (props) => {
    return(
        <Pressable style={{
            flexDirection: 'row',
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
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
                <Icon name='x' size={15} />
            </View>
        </Pressable>
    );
}

const Separator = (props) => {
    return(
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
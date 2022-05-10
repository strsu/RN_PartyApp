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
    Pressable
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function PartyConstructorPresenter(props) {
    console.log('@PartyConstructorPresenter');

    const navigation = props.props.navigation;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <FlatList
                    data={props.state.partyData}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    //onEndReached={props.state.loadData}
                    numColumns={3}
                    renderItem={item => boardCard({navigation, item})}
                />
            </View>
        </SafeAreaView>
    );
}

export default PartyConstructorPresenter;

const boardCard = ({navigation, item}) => {
    // 여기서 if로 boardCard 구분 가능
    item = item["item"];

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                margin: 3,
                marginBottom: 10,
            }}>
            
            <TouchableOpacity
                onPress={() => navigation.navigate('PartyNavigator', {params: {item}, screen: 'SubPartyDetail'})}
            >
                <Image
                    style={styles.imageThumbnail}
                    source={{uri: item.images}}
                />
                <View>
                    <Text 
                    numberOfLines={1}
                    style={{
                            fontSize: 12,
                            fontWeight: '700',
                            marginBottom: -2,
                            
                        }}>{item.title}</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon name="dot-fill" size={15} color='#BAE7AF'/>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 11,
                            marginBottom: 2,
                        }}
                            numberOfLines={1}
                        >{item.tags}</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        </View>
    );
};

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
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: parseInt(windowHeight/6.7),
        borderRadius: 5,
        resizeMode: 'cover',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 30,
        backgroundColor: 'white',
    },
});
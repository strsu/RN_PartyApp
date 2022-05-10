import React, {useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    useColorScheme, // device size
    Button,
}
from 'react-native'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';


import {getData, postMainBoard} from "../../../../API/crud";
import GlobalStyles from "../../globalStyles";
import {Header, Footer} from '../../Bar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function PartyScreen_MainWriting({navigation}) {

    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [dateTime, setDateTime] = useState(new Date());
    const [content, setContent] = useState("");

    const [imageUri, setimageUri] = useState('');
    const [imageUriGallary, setimageUriGallary] = useState([]);

    let obj = {
        title: "",
        place: "",
        dateTime: new Date(),
        content: "",
        img: ""
    };

    function makeJson() {
        obj.title = title;
        obj.place = place;
        obj.dateTime = dateTime;
        obj.content = content;

        obj.img = imageUriGallary;

        postMainBoard(obj);
    }

    const openCamera = () => {
        let options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if(response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if(response.customeButton) {
                console.log('User tapped custom button: ', response.customeButton);
            } else {
                //const source = {uri: 'data:image/jpeg;base64,' + response.base64};
                setimageUri(response.assets[0].base64);
            }
        });
    };

    const openGallery = () => {
        let options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            //console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if(response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if(response.customeButton) {
                console.log('User tapped custom button: ', response.customeButton);
            } else {
                //const source = {uri: 'data:image/jpeg;base64,' + response.base64};
                setimageUriGallary(...imageUriGallary, response.assets[0].base64);
                
            }
        });
    };

    // You can also use as a promise without 'callback':
    //const result = await launchImageLibrary(options?);

    return (
        <SafeAreaView style={styles.container}>
            {/*<Header headerParams={headerParams}/>*/}

            <ScrollView style={styles.main}>

                    <View style={styles.contentsTitle}>
                        <TextInput
                            //value={obj.title}
                            placeholder="제목"
                            onChangeText={newText => setTitle(newText)}
                            //onChange={handleChange}
                            style={styles.contentsTitle_}
                        />
                    </View>

                    <View style={styles.contentsTitle}>
                        <TextInput
                            //value={obj.place}
                            placeholder="장소"
                            //onChange={handleChange}
                            onChangeText={newText => setPlace(newText)}
                            style={styles.contentsTitle_}
                        />
                    </View>

                    <View style={styles.contentsDateTime}>
                        <DatePicker
                            //value={obj.place}
                            style={{height: parseInt(windowHeight/15)}}
                            date={dateTime}
                            onDateChange={setDateTime}
                            //onChange={handleChange}
                            locale='ko'
                            mode="datetime"
                        />
                    </View>

                    
                    <View style={styles.contentsImg}>
                        <ScrollView
                            style={styles.contentsImgSV}
                            horizontal = {true} // 너가 날 살렸다.
                        >
                            <TouchableOpacity
                                onPress={() => {openGallery();}}
                            >
                                <Image
                                    style={styles.contentImgSel}
                                    source={{uri: 'data:image/jpeg;base64,' + imageUriGallary}}
                                />
                            </TouchableOpacity>
                        </ScrollView >
                    </View>

                    <View style={styles.contentContent}>
                        <TextInput
                            placeholder="본문"
                            onChangeText={newText => setContent(newText)}
                            style={styles.contentsTitle_}
                        />
                    </View>
                    <Button
                        onPress={() => {makeJson();}}
                        title="저장하기"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
            </ScrollView>
        </SafeAreaView>
    );
}

export default PartyScreen_MainWriting;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    main: {
        flex: 14,
        padding: 5,
    },
    contentsTitle: {
        backgroundColor: 'white',
        elevation: 3,
        marginBottom: 5,
        paddingLeft: 5,
        height: parseInt(windowHeight/15),
    },
    contentsDateTime: {
        backgroundColor: 'white',
        elevation: 3,
        marginBottom: 5,
        paddingLeft: 5,
        height: parseInt(windowHeight/15),
        flexDirection: "row",
    },
    contentsImg: {
        height: parseInt(windowHeight/5),
        backgroundColor: 'white',
        elevation: 3,
        marginBottom: 5,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    contentsImgSV: {
        marginTop: 15,
    },
    contentImgSel: {
        height: parseInt(windowHeight/8),
        width: parseInt(windowWidth/5),
        margin: 5,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'black',
    },
    contentContent: {
        height: parseInt(windowHeight/2),
        backgroundColor: 'white',
        elevation: 3,
        marginBottom: 5,
    }
  });
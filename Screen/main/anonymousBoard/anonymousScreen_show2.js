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
    Button,
    Dimensions
}
from 'react-native'

import AppContext from '../../../AppContext';

import Icon from 'react-native-vector-icons/Octicons';
import { SliderBox } from "react-native-image-slider-box";

import {getData, putData} from "../../../API/crud";
import {Header, AnonyFooter} from '../Bar';
import GlobalStyles from "../globalStyles";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let selectedComment = -1;

const BigCommentCard = (item) => {
    const cnt = Object.keys(item['bigComment']).length;
    let bc = new Array();

    for(let i=0; i<cnt; i++) {
        let data = item['bigComment'][i];
        bc.push(
            <View style={{
                padding: 5,
                marginLeft: 30,
                backgroundColor: '#929496',
                borderRadius: 10,
                marginBottom: 5,
            }}>
                
                <View style={{
                flexDirection: 'row',
                }}>
                    <View style={{
                        width: '75%',
                    }}>
                        <Text>{data['replyer']}</Text>
                    </View>

                    <View style={{
                        backgroundColor: 'gray',
                        padding: 5,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity>
                            <Icon style={{marginRight: 10, marginLeft: 5}} name="heart" size={15} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={{marginRight: 5, marginLeft: 10}} name="bell" size={15} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>

                <View>
                    <Text>{data['content']}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text>{data['wdate']}</Text>

                    <View style={{
                        marginLeft: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon style={{marginRight: 5, marginLeft: 10}} name="heart" size={15} color="black" />
                        <Text>{data['like']}</Text>
                    </View>
                </View>


            </View> 
        );
    }

    return bc;
}

const boardCard = ({item}) => {
    // 여기서 if로 boardCard 구분 가능
    item = item["item"];
    
    return (
        <View style={{
            padding: 5,
            borderBottomWidth: 1,
            //backgroundColor: curColor ? '#afc0db' : 'red',
        }}>
            
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{
                    width: '75%',
                }}>
                    <Text>{item['replyer']}</Text>
                </View>

                <View style={{
                    backgroundColor: 'gray',
                    padding: 5,
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        onPress={() => {} }
                    >
                        <Icon style={{marginRight: 10, marginLeft: 5}} name="comment" size={15} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={{marginRight: 10, marginLeft: 10}} name="heart" size={15} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={{marginRight: 5, marginLeft: 10}} name="bell" size={15} color="black" />
                    </TouchableOpacity>
                </View>

            </View>

            <View>
                <Text>{item['content']}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                marginBottom: 5,
            }}>
                <Text>{item['wdate']}</Text>
                <View style={{
                        marginLeft: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon style={{marginRight: 5, marginLeft: 10}} name="heart" size={15} color="black" />
                        <Text>{item['like']}</Text>
                </View>
            </View>

            
            <BigCommentCard bigComment={item['bigComment']}/>

        </View> 
    );
};

const bigCommentInput = (params) => {
    selectedComment = params;
    console.log(selectedComment);
}

//function ContentArea({params}) {
const ContentArea = (params) => {

    async function fetchBoard() {
        try {                
            const response = await getData(url+'reply/'+item["index"]);
            if(response == 404 || response == 500) console.error("Server Error");
            else setData(response);
            console.log('@AnonymousScreen_Show <useEffect>', response);
        } catch (e) {
            console.error(e);
        }
    };

    const item = params["item"];
    return (
        <View style={{
            marginLeft: 5,
            marginRight: 5,
        }}>
            <View style={styles.contentTop}>
                <View>
                    <Text>{item["type"]}</Text>
                </View>
            </View>

            {/*<View>
                // 슬라이드 이미지
                <SliderBox
                    images={img}
                    sliderBoxHeight={200}
                    //onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                />
            </View>*/}

            <View style={styles.contentMid}>
                <View style={styles.contentMidTop}>
                    <View style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Icon style={styles.contentIcon} name="dot-fill" size={15} color="black" />
                        <Text style={{marginLeft: 5,}}>{item["writer"]}</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 5,
                }}>
                    
                        
                    <View style={{
                        width: "40%",
                        flexDirection: 'row',
                    }}>
                        <Text>{"조회 "+item["read"]}</Text>
                    </View>

                    <View style={{
                        width: "60%",
                        alignItems: 'flex-end'
                    }}>
                        <Text>{item["wdate"]}</Text>
                    </View>
                    
                </View>

                <View style={{
                    marginTop: 5,
                }}> 
                    <Image
                        style={{
                            height: item["images"] == "" ? 0 : 300,
                            resizeMode: 'contain',
                        }}
                        source={{ uri: item["images"] == "" ? " ": item["images"] }}
                        onLoad={ () => {console.log('loaded', item["images"])}}
                        onLoadStart={ () => {console.log('loading', item["images"])}}
                    />
                </View>
                

            </View>

            <View style={{
                marginTop: 5,
            }}>
                <Text>{item["content"]}</Text>
            </View>

            

        </View>
    );
}

const putComment = (isBigComment, uid, uuid, content) => {

    let url = "http://192.168.1.243:4000/anonyboard/";

    if(content == '') return;
    
    const updateBoard = async () => {
        try {
            let sql = {
                uid: uid,
                uuid: uuid,
                content: content,
            }
            const response = await putData(url+'reply/'+isBigComment, sql);
            if(response == 404 || response == 500) console.log("Server Error");
        } catch (e) {
            console.log(e);
        }
    };

    updateBoard();
}

function AnonymousScreen_Show({route, navigation}) {
    console.log('@AnonymousScreen_Show');
    
    const user = React.useContext(AppContext);

    const [comment, setComment] = useState('');
    const [commentData, setCommentData] = useState();
    const [isBigComment, setIsBigComment] = useState(0);

    React.useLayoutEffect(() => {
        console.log('@AnonymousScreen_Show - useLayoutEffect');
        // 부모 속성을 가져온 다음에 옵션으로 bar를 안 보이게 처리해야 한다.
        navigation.getParent().setOptions({
            tabBarStyle: { display: "none" },
        });
    }, [navigation]);

    const item = route["params"]["paramKey"];

    const bigCommentInput = (params) => {
        setIsBigComment(12);
    }

    console


    let url = "http://192.168.1.243:4000/anonyboard/";

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                setCommentData(null);
                
                const response = await getData(url+'reply/'+item["index"]);
                if(response == 404 || response == 500) console.error("Server Error");
                else setCommentData(response);
            } catch (e) {
                console.error(e);
            }
        };

        fetchBoard();
    }, []);

    useEffect(() => {
        const updateBoard = async () => {
            try {
                const response = await putData(url+'read/'+item["index"], '');
                if(response == 404 || response == 500) console.error("Server Error");
            } catch (e) {
                console.error(e);
            }
        };

        updateBoard();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/*<Header headerParams={headerParams}/>*/}
            <View style={styles.main}>
                {/*<ContentArea params={{item, img}}/>*/}
                <FlatList
                    data={commentData}
                    ListHeaderComponent={ContentArea({item})}
                    renderItem={item => boardCard({item})}
                />
            </View>
            
            {/* 댓글달기 영역 */}

            <View style={{
                //maxHeight: 100,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 10,
                flexDirection: 'row',
                backgroundColor: 'gray',
                borderRadius: 10,
                alignItems: 'center',
            }}>
                <TextInput
                    multiline
                    numberOfLines={1}
                    style={{
                        padding: 10,
                        width: '85%',
                        textAlignVertical: 'top',
                        marginRight: 10,
                    }}
                    value={comment}
                    onChangeText={text=>setComment(text)}
                    underlineColorAndroid="transparent"
                    returnKeyType='next'
                    placeholder="댓글을 입력하세요."
                />
                <TouchableOpacity 
                    style={{
                
                }}
                    onPress={ () => putComment( isBigComment, item["index"], user.uuid, comment ) }
                >
                    <Icon style={{marginRight: 5, marginLeft: 10}} name="paper-airplane" size={20} color="black" />
                </TouchableOpacity>
            </View>            

        </SafeAreaView>
    );
}

export default AnonymousScreen_Show;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    main: {
        flex: 1,
        margin: 5,
    },

    contentTop : {
        flexDirection: "column",
    },
    contentMid : {
        //height: parseInt(windowHeight*2),
        flexDirection: "column",
        marginTop: 5,
        //backgroundColor: 'red',
    },
    contentMidTop : {
        flexDirection: "row",
    },
    contentMidMid : {
    },
    contentMidBtm : {
    },
    reply : {

    },

    row: {
        flexDirection: "row",
    },
    line: {
        height: parseInt(windowHeight/5),
        width: "100%",
        marginTop: 5,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 3,
        flexDirection: "row",
    },
    lineLeft : {
        width: "70%",
    },
    lineRight : {
        width: "30%",
    },

    lineLeftTop : {
        height: "20%",
    },
    lineLeftMid : {
        height: "60%",
        flexDirection: "column",
    },
    lineLeftBtm : {
        height: "20%",
        flexDirection: "row",
    },
    lineLeftBtmText : {
        marginRight: 10,
    },
    lineLeftMidTop : {
        height: "20%",
    },
    lineLeftMidMid : {
        height: "60%",
    },
    lineLeftMidBtm : {
        height: "20%",
        marginRight: 5,
    },

    lineRightTop : {
        height: "80%",
    },
    lineRightBtm : {
        height: "20%",
    },

    item: {
        margin: 5,
        fontSize: 18,
    },
    left: {
        width: "75%",
    },
    left_top: {
        position: 'relative',
        flex: 1,
        flexDirection: "row",
    },
    left_btm: {
        position: 'relative',
        flex: 2,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        width: "25%",
    },
    rightImg: {
        position: 'relative',
        height: '100%',
        resizeMode: 'stretch'
    },

    profileArea: {
        height: parseInt(windowHeight/15),
    },
  });
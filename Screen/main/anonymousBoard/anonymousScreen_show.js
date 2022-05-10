import React, {useState, useEffect, Component } from 'react';
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
    Dimensions,
    BackHandler
}
from 'react-native'
import useStore, {useAnony} from '../../../AppContext';
import { QueryClient, useQuery } from 'react-query'

import Icon from 'react-native-vector-icons/Octicons';
import { SliderBox } from "react-native-image-slider-box";

import { baseURL } from '../../../database';


import {getData, putData} from "../../../API/crud";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class AnonymousScreen_Show extends React.Component {

    constructor(props) {
        super(props);
        console.log('@AnonymousScreen_Show');

        this.state = {
            comment: '',
            commentData: [],
            item: this.props.route.params.paramKey,
            data: null,
            selectedComment: -1,
            userUUID: useStore.getState().uuid,
            isMsgSend: useAnony.getState().send,
            updateMsgSend: useAnony.getState().setSend,
        };

        // class component에서는 이렇게 해야 한다.
        this.myRef = React.createRef();

        this.ContentArea = this.ContentArea.bind(this);
        this.BoardCard = this.BoardCard.bind(this);
        this.BigCommentCard = this.BigCommentCard.bind(this);

        console.log(this.state.item);

    }

    componentDidMount() {
        // 부모 속성을 가져온 다음에 옵션으로 bar를 안 보이게 처리해야 한다.
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "none" },
        });

        let url = baseURL + "/anony/anonyboard/";

        const fetchBoard = async () => {
            try {                
                const response = await getData(url+'reply/'+this.state.item["uid"]);
                this.setState({
                    commentData: response,
                })
            } catch (e) {
                console.warn(e);
            }
        };

        const updateBoard = async () => {
            try {
                const response = await putData(url+'read/'+this.state.item["uid"], '');
                if(response == 404 || response == 500) console.log("Server Error");
            } catch (e) {
                console.warn(e);
            }
        };

        updateBoard();
        fetchBoard();

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

    }

    componentDidUpdate() {

        if(this.state.isMsgSend) {
            const fetchBoard = async () => {
                try {
                    let url = "http://192.168.1.243:4000/anony/anonyboard/";
                    const response = await getData(url+'reply/'+this.state.item["uid"]);
                    
                    if(response == 404 || response == 500) {
                        console.log("Server Error");
                    } else {
                        this.setState({
                            commentData: response,
                        })
                    }
                } catch (e) {
                    console.warn(e);
                }
            };

            fetchBoard();
            this.state.updateMsgSend();
            this.setState({
                isMsgSend: useAnony.getState().send,
            })
            this.myRef.current.scrollToEnd({animated:true});
        }
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                {/*<Header headerParams={headerParams}/>*/}
                <View style={styles.main}>
                    {/*<ContentArea params={{item, img}}/>*/}
                    <FlatList
                        ref = {this.myRef}
                        data={this.state.commentData}
                        //ListHeaderComponent={ContentArea(this.state.item)}
                        //ItemSeparatorComponent={(props) => {return(<View></View>);}}
                        ListHeaderComponent={ () => this.ContentArea() }
                        renderItem={item => this.BoardCard({item})}
                        //onContentSizeChange={()=> this.myRef.current.scrollToEnd({animated:true})}
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
                        value={this.state.comment}
                        onChangeText={text=>this.setState({comment: text})}
                        underlineColorAndroid="transparent"
                        returnKeyType='next'
                        placeholder={this.state.selectedComment == -1 ?  "댓글을 입력하세요." :  "대댓글을 입력하세요."}
                    />
                    <TouchableOpacity style={{
                        }}
                        onPress={ () => this.putComment( this.state.selectedComment == -1 ? 0 : this.state.selectedComment, this.state.item.uid, this.state.userUUID, this.state.comment ) }
                    >
                        <Icon style={{marginRight: 5, marginLeft: 10}} name="paper-airplane" size={20} color="black" />
                    </TouchableOpacity>

                </View>            
    
            </SafeAreaView>
        );
    }

    ContentArea () {

        let item = this.state.item;

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
                        {
                            item["images"] != "" ?
                            <Image
                                style={{
                                    height: item["images"] == "" ? 0 : 300,
                                    resizeMode: 'contain',
                                }}
                                source={{uri: item["images"]}}
                            ></Image> :
                            <></>
                        }
                    </View>
                    
    
                </View>
    
                <View style={{
                    marginBottom: 5,
                }}>
                    <Text>{item["content"]}</Text>
                </View>
    
            </View>
        );
    }

    BoardCard (item) {
        // 여기서 if로 boardCard 구분 가능
        item = item["item"]["item"];

        return (
            <View style={{
                padding: 5,
                borderBottomWidth: 1,
                backgroundColor: this.state.selectedComment == item["seqM"] ? '#afc0db' : 'white',
            }}
                //key={item}
            >
                
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
                            onPress={ () => this.BigCommentInput(item["seqM"]) }
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
    
                
                {<this.BigCommentCard bigComment={item['bigComment']}/>}
    
            </View> 
        );
    };

    BigCommentCard (item) {
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
                    }}
                    // 이렇게 해야 each child should have a unique key 뭐 이딴 오류 안 뜬다.
                    key={String(data["seqM"]+"_"+i)}
                >
                    
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

    BigCommentInput (which) {
        this.setState({
            selectedComment: this.state.selectedComment != -1 ? -1 : which
        });
    }

    backAction = () => {
        if(this.state.selectedComment != -1) {
            this.setState({
                selectedComment: -1,
            })
            return true;
        }
        //return true;
    };

    putComment = (isBigComment, uid, uuid, content) => {

        let url = "http://192.168.1.243:4000/anony/anonyboard/";
        
        if(content == '') return;
       
        const updateBoard = async () => {
            try {
                let sql = {
                    uid: uid,       // 게시글 id
                    uuid: uuid,     // 사용자 id
                    content: content,
                }
                const response = await putData(url+'reply/'+isBigComment, sql);
                if(response == 404 || response == 500) console.log("Server Error");
            } catch (e) {
                console.log(e);
            }
        };
    
        updateBoard();
        
        this.state.updateMsgSend();
        this.setState({
            isMsgSend: useAnony.getState().send,
            comment: "",
        })
    }


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
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
    Modal,
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { useAnony } from '../../AppContext';
import { useIsFocused } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BoardDetailPresenter(props) {
    console.log('@BoardDetailPresenter');

    const isFocused = useIsFocused();    
    React.useEffect(() => {
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <FlatList
                    ref = {props.state.myRef}
                    data={props.state.commentData}
                    ListHeaderComponent={ () => ContentArea(props) }
                    renderItem={item => comment({item}, props.state)}
                    //onContentSizeChange={()=> this.myRef.current.scrollToEnd({animated:true})}
                />
            </View>
            <CommentInput props={props}/>
        </SafeAreaView>
    );
}

export default BoardDetailPresenter;

const BigCommentCard = (item) => {
    const cnt = Object.keys(item['bigComment']).length;
    let bc = new Array();

    for(let i=0; i<cnt; i++) {
        let data = item['bigComment'][i];
        bc.push(
            <View style={{
                padding: 5,
                marginLeft: 30,
                backgroundColor: item.isMine == 1 ? '#BAE7AF' : '#929496', //'#929496',
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
                        <Text>{data.replyer}</Text>
                    </View>

                    <View style={{
                        backgroundColor: 'gray',
                        padding: 5,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            onPress={() => {item.state.pushHeart(data, 'comment')}}>
                            <Icon style={{marginRight: 10, marginLeft: 5}} name="heart" size={15} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon 
                                style={{marginRight: 5, marginLeft: 10}} 
                                name={ data.isMine == 1 ? "x" : "bell" }
                                size={15} 
                                color="black" 
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View>
                    <Text>{data.content}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text>{data.wdate}</Text>

                    <View style={{
                        marginLeft: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon 
                            style={{marginRight: 5, marginLeft: 10}} 
                            name="heart" 
                            size={15} 
                            color={data.isLike == 1 ? 'red' : "black" } />
                        <Text>{data.like}</Text>
                    </View>
                </View>


            </View> 
        );
    }

    return bc;
}

const comment = (item, state) => {
    // 여기서 if로 boardCard 구분 가능
    const idx = item.item.index;
    item = item["item"]["item"];
    
    return (
        <View style={{
            padding: 5,
            backgroundColor: state.selectedComment == item["seqM"] ? '#afc0db' : 'white',
        }}
        >
            <View style={{
                backgroundColor: item.isMine == 1 ? '#BAE7AF' : '#929496', //#2e6ac9
                borderRadius: 10,
                padding: 5,
                marginBottom: 5,
                marginRight: 30,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        width: '70%',
                    }}>
                        <Text>{item['replyer']}</Text>
                    </View>

                    <View style={{
                        backgroundColor: 'gray',
                        padding: 5,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            onPress={ () => state.setSelectedComment(item["seqM"]) }
                        >
                            <Icon style={{marginRight: 10, marginLeft: 5}} name="comment" size={15} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={ () => state.pushHeart(item, 'comment') }>
                            <Icon style={{marginRight: 10, marginLeft: 10}} name="heart" size={15} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon 
                                style={{marginRight: 5, marginLeft: 10}} 
                                name={ item.isMine == 1 ? "x" : "bell" }
                                size={15} 
                                color="black" 
                            />
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
                            <Icon 
                                style={{marginRight: 5, marginLeft: 10}} 
                                name="heart" 
                                size={15} 
                                color={item.isLike == 1 ? 'red' : "black" } />
                            <Text>{item['like']}</Text>
                    </View>
                </View>
            </View>
            {<BigCommentCard bigComment={item['bigComment']} state={state} />}

        </View> 
    );
};

const CommentInput = ({props}) => {
    return(
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
                ref={props.state.inputRef}
                multiline
                numberOfLines={1}
                style={{
                    padding: 10,
                    width: '85%',
                    //textAlignVertical: 'top',
                    marginRight: 10,
                }}
                /*
                    state가 바뀌면 화면은 다시 렌더링 된다.
                    그럼 글자를 하나 쓸 때 마다 이미지를 다시 렌더링 하는 문제가 발생해
                    이미지 플리커가 발생한다.
                    이를 해결하기 위해선 현재 컴포넌트의 state를 변화시키지 않고,
                    redux, zustand 같은 context state를 변화시킴으로써 현재 화면의 렌더링을 억제할 수 있다.
                    이를 통해 키보드 입력시 이미지를 다시 그리는 작업을 피할 수 있었다.
                */
                onChangeText={text=>useAnony.getState().setCommentText(text)}
                
                //onChangeText={text=>props.state.setComment(text)}
                
                underlineColorAndroid="transparent"
                returnKeyType='done'
                placeholder={props.state.selectedComment == -1 ?  "댓글을 입력하세요." :  "대댓글을 입력하세요."}
            />
            <TouchableOpacity style={{
                }}
                onPress={ () => props.state.putComment() }
            >
                <Icon style={{marginRight: 5, marginLeft: 10}} name="paper-airplane" size={20} color="black" />
            </TouchableOpacity>

        </View>
    );
}

const ContentArea = (props) => {

    const item = props.props.route.params.paramKey;
    
    return (
        <View style={{
            padding: 10,
            marginBottom: 10,
            
        }}>
            <View style={styles.contentTop}>
                <View>
                    <Text style={{
                        fontSize: 16,
                    }}>{`[${item.type}] ${item.title}`}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => props.state.setKebabModal(true)}
                >
                    <Icon name='kebab-horizontal' size={25} />
                    {
                        props.state.kebabModalVisiable ? <KebabModal props={props} item={item} /> : <></>
                    }
                </TouchableOpacity>
            </View>

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
                        <Text>{`조회수 ${item.read} 좋아요 ${item.like}`}</Text>
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
                                height: item["images"] == "" ? 0 : 500,
                                resizeMode: 'contain',
                            }}
                            source={{uri: item["images"]}}
                        ></Image> :
                        <></>
                    }
                </View>
                

            </View>

            <View style={{
                marginBottom: 10,
                minHeight: 100,
            }}>
                <Text>{item["content"]}</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                    onPress={() => props.state.pushHeart(item, 'content')}
                >
                    <Icon name='heart-fill' size={25} color={ item.isLike == 0 ? 'black' : 'red'} />
                    <Text style={{
                        marginLeft: 5,
                        fontSize: 20,
                    }}>{item.like}</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const KebabModal = ({props, item}) => {
    const navigation = props.props.navigation;
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.state.kebabModalVisiable}
        >
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
            }}>
                <View style={{
                    margin: 5,
                    marginLeft: 15,
                    marginRight: 15,
                    backgroundColor: 'black',
                    borderRadius: 10,
                }}>
                    {
                        item.isMine ?
                            <TouchableOpacity style={{
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 15,
                                borderRadius: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: 'gray',
                            }}
                                onPress={() => {
                                    props.state.setKebabModal(false);
                                    navigation.navigate("BoardWriting", {params: 'update', item: props.state.item});
                                }}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    color: 'white',
                                }}>글 수정</Text>
                            </TouchableOpacity> :
                            <></>
                    }

                    <TouchableOpacity style={{
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 15,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: 'red',
                        }}>{item.isMine ? '삭제' : '신고'}</Text>
                    </TouchableOpacity>
                    
                </View>

                <TouchableOpacity style={{
                    backgroundColor: 'black',
                    alignItems: 'center',
                    borderRadius: 10,
                    padding: 15,
                    margin: 15,
                }}
                    onPress={() => props.state.setKebabModal(false)}
                >
                    <Text style={{
                        fontSize: 15,
                        color: 'white',
                    }}>닫기</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
}

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
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
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
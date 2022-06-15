import React, { useState } from 'react';
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
    KeyboardAvoidingView,
    Platform,
    ScrollView
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import CheckBox from '@react-native-community/checkbox';
import useStore from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainPartyDetailPresenter(props) {
    console.log('@MainPartyDetailPresenter');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <FlatList
                    data={props.state.showType == '상세정보' ? props.state.partyContent : props.state.showType == '리뷰' ? props.state.partyReview : props.state.partyQnA}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => <Detail item={item} type={props.state.showType} props={props} />}
                    ListHeaderComponent={<Header imageData={props.state.partyInfo.images} info={props.state.partyInfo} func={props.state.setShowType} />}

                //ListFooterComponent={}
                />
            </View>
            <Footer props={props} />
        </SafeAreaView>
    );
}

export default MainPartyDetailPresenter;

const Header = ({ imageData, info, func }) => {
    return (
        <View>
            <FlatList
                horizontal
                data={imageData}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={parseInt(windowWidth)}
                renderItem={(item) => <ImgSlider item={item} />}
            />
            <Info item={info} />
            <View style={{
                flex: 1,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 40,
                marginLeft: 10,
                marginRight: 10,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 40,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 20,
                }}
                    onPress={() => func('상세정보')}
                ><Text style={{ fontSize: 16, }}>상세정보</Text></TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 40,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 20,
                }}
                    onPress={() => func('리뷰')}
                ><Text style={{ fontSize: 16, }}>리뷰</Text></TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 40,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 20,
                }}
                    onPress={() => func('QnA')}
                ><Text style={{ fontSize: 16, }}>Q&A</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const Footer = ({ props }) => {
    if (props.state.showType == '상세정보') {
        return (<DetailFooter props={props} />);
    } else {
        return (<></>);
    }
}

const DetailFooter = ({ props }) => {
    return (
        <View style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#BAE7AF',
            padding: 5,
            // ios
            shadowColor: 'black',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            //aos
            elevation: 3,
        }}>
            <TouchableOpacity
                onPress={() => props.props.navigation.navigate('MainPartyPayment', { uid: props.state.uid, timeline: props.state.partyInfo.timeline})}
            >
                <Text>신청하기</Text>
            </TouchableOpacity>

        </View>
    );
}

const ReviewFooter = ({ props }) => {
    return (
        <KeyboardAvoidingView style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 5,
            minHeight: props.img != '' ? 180 : 40,
            // ios
            shadowColor: 'black',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            // aos
            elevation: 3,
        }}
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior='padding'
        //keyboardVerticalOffset={4}
        >
            <ScrollView style={{
                //flex: 1,
                width: '100%',
                height: props.textHeight,
                borderWidth: 1,
                borderRadius: 10,
                margin: 5,
                backgroundColor: 'white',
            }}
                showsVerticalScrollIndicator={true}
            >
                <View style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: 10,
                }}>
                    {
                        props.img == '' ?
                            <></> :
                            <View>
                                <Image
                                    style={{ height: 100, width: 100 }}
                                    resizeMode='contain'
                                    source={{ uri: 'data:image/jpeg;base64,' + props.img }}
                                />
                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    top: 18,
                                    right: 5,
                                }}>
                                    <Icon
                                        style={{
                                            borderRadius: 100,
                                            backgroundColor: 50,
                                            opacity: 1,
                                            height: 20,
                                            width: 20,
                                            paddingLeft: 5,
                                            paddingTop: 1,
                                        }}
                                        name='x'
                                        size={18} />
                                </TouchableOpacity>

                            </View>
                    }

                    <TextInput
                        style={{
                            //flex: 1,
                            //width: '100%',
                            //height: 40,
                            //borderWidth: 1,
                            //borderRadius: 20,
                            height: props.textHeight,
                            textAlignVertical: 'top',
                        }}
                        multiline
                        placeholder="리뷰를 남겨주세요"
                        underlineColorAndroid="transparent"
                        returnKeyType='next'

                        onChange={(event) => { props.setContent(event.nativeEvent) }}
                    //value={props.state.content}
                    //onChangeText={newText => props.state.setContent(newText)}
                    />
                </View>
            </ScrollView>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-start',
                }}>
                    <TouchableOpacity
                        onPress={() => props.openGallery()}
                    >
                        <Icon name='image' size={23} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#BAE7AF',
                        paddingTop: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingBottom: 5,
                        borderRadius: 20,
                    }}>
                        <Text>입력</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </KeyboardAvoidingView>
    );
}

const QnAFooter = ({ state }) => {
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                marginTop: 10,
                /*
                backgroundColor: 'white',
                // ios
                shadowColor: 'black',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.3,
                //aos
                elevation: 3,*/
            }}>
                <View style={{
                    flex: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    
                    borderWidth: 1,
                    borderRadius: 20,
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 15,
                        paddingLeft: 5,
                    }}>
                        <CheckBox
                            disabled={false}
                            value={state.toggleCheckBox}
                            onValueChange={(newValue) => state.setToggleCheckBox(newValue)}
                        />
                        <Text style={{
                            color: 'green',
                            fontWeight: 'bold',
                        }}>비밀</Text>
                    </View>
                    <View style={{
                        flex: 7,
                    }}>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                padding: 10,
                            }}
                            placeholder='질문을 등록해주세요'
                            onChangeText={(text) => state.setQNAText(text)}
                        />
                    </View>
                </View>

                <View style={{
                    flex: 1.5,
                    alignItems: 'center',
                    marginLeft: 5,
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#BAE7AF',
                        paddingTop: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingBottom: 10,
                        borderRadius: 20,
                    }}
                        onPress={() => state.qnaPost()}>
                        <Text>등록</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const Info = ({ item }) => {

    let timeline = [];
    for (const [key, value] of Object.entries(item.timeline).reverse()) {
        timeline.push(
            <View style={{
                padding: 10,
            }}
                key={key}
            >

                <View style={{
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'deepskyblue',
                        padding: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                            marginLeft: 5,
                            fontSize: 17,
                            fontWeight: '700',
                            color: 'black',
                        }}>{key}</Text>

                        <Text style={{
                            flex: 1,
                            fontSize: 14,
                            fontWeight: '500',
                            color: 'black',
                            textAlign: 'right',
                        }}>{'신청마감: ' + value.deadline}</Text>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 2,
                    }}>
                        <IconEntypo name="price-tag" size={15} />
                        <Text style={{
                            marginLeft: 5,
                        }}>{"남: " + value.pricem}</Text>
                        <Text style={{
                            marginLeft: 5,
                        }}>{"여: " + value.pricew}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 4,
                        marginTop: 2,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Icon name="dot-fill" size={15} color="blue" />
                                <Text style={{
                                    marginLeft: 5,
                                }}>{value.signm + "/" + value.attendm + ' (' + value.minagem + '~' + value.maxagem + ')'}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 10,
                            }}>
                                <Icon name="dot-fill" size={15} color="red" />
                                <Text style={{
                                    marginLeft: 5,
                                }}>{value.signw + "/" + value.attendw + ' (' + value.minagew + '~' + value.maxagew + ')'}</Text>
                            </View>
                        </View>

                        <View style={{
                            marginRight: 5,
                        }}>
                            <TouchableOpacity>
                                <Text>참석명단 확인</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </View>
        );
    }

    return (
        <View>
            <View style={{
                padding: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '700',
                    }}>{item.title}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 2,
                }}>
                    <Icon name="calendar" size={15} />
                    <Text style={{
                        marginLeft: 5,
                    }}>{item.mdate}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 2,
                }}>
                    <Icon name="location" size={15} />
                    <Text style={{
                        marginLeft: 5,
                    }}>{item.place}</Text>
                </View>
            </View>
            {timeline}
        </View>
    );
}

const Detail = ({ item, type, props }) => {
    if (type == '상세정보') {
        return (
            <View style={{
                padding: 15,
            }}>
                <Text>{item.item}</Text>
            </View>
        );
    } else if (type == '리뷰') {
        let comment = [];
        let avgScore = 0;
        item.item.map(data => {
            avgScore += data.score;
            comment.push(
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: 30,
                    padding: 10,
                }}
                    key={data.nickname}
                >
                    <View style={{
                        //프로필 영역
                        flex: 1,
                        //backgroundColor: 'red',
                    }}>
                        <Image style={{
                            width: '80%',
                            aspectRatio: 1,
                            backgroundColor: 'red',
                            borderRadius: 100,
                        }}
                        />
                    </View>
                    <View style={{
                        // 내용 영역
                        flex: 5,
                        //backgroundColor: 'blue',
                    }}>
                        <View style={{
                            flex: 1,
                            //padding: 10,
                            marginBottom: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        color: 'black',
                                    }}>{data.nickname}</Text>
                                    <Text style={{
                                        marginLeft: 10,
                                    }}>({data.timeline} 참석자)</Text>
                                </View>

                                <TouchableOpacity>
                                    <Icon name='kebab-horizontal' size={17} />
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 3,
                                marginBottom: 7,
                            }}>
                                <Image
                                    style={{
                                        height: 20,
                                        width: 100,
                                        resizeMode: 'contain',
                                        marginRight: 10,
                                    }}
                                    source={require('../icon/5.png')}
                                />
                                <Text>{data.date}</Text>
                            </View>

                            <Text>{data.content}</Text>
                        </View>
                        {
                            data.admincontent == '' ? <></> :
                                <View style={{
                                    backgroundColor: 40,
                                    padding: 10,
                                }}>
                                    <Text>개최자 답변</Text>
                                    <Text>{data.admindate}</Text>
                                    <Text>{data.admincontent}</Text>
                                </View>
                        }
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: 80,
                                borderRadius: 10,
                                marginTop: 5,
                            }}>
                                <Icon name='thumbsup' size={16} />
                                <Text style={{
                                    marginLeft: 5,
                                }}>{data.helpcnt}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        })

        return (
            <View style={{
                flex: 1,
                padding: 5,
                marginTop: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    marginLeft: 10,
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>리뷰평점 {String(avgScore / comment.length).substring(0, 3) + `(${comment.length})`}</Text>
                </View>
                {
                    props.state.AttendTime == '' ? <></> :
                    <View style={{
                        padding: 10,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderTopColor: 50,
                        borderBottomColor: 50,
                        paddingTop: 20,
                        paddingBottom: 20,
                    }}>
                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: 'deepskyblue',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                        }}
                        onPress={() => props.props.navigation.navigate('MainPartyReview', 
                                { 
                                    uid: props.state.uid, 
                                    AttendTime: props.state.AttendTime,
                                    images: props.state.partyInfo.images,
                                })}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 17,
                                fontWeight: 'bold',
                            }}>리뷰 작성하기</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View>
                    {comment}
                </View>
            </View>
        );
    } else {
        let qna = [];
        if (item.item != 0) {
            item.item.map(data => {
                qna.push(
                    <View style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: 40,
                    }}
                        key={data.content}
                    >
                        <Text>Q: {data.content}</Text>
                        {
                            data.answer == null ? <></> :
                                <Text>A: {data.answer}</Text>
                        }
                    </View>
                );
            });
        }

        return (
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    // QnA 입력창
                    flex: 1,
                    padding: 5,
                }}>
                    <QnAFooter state={props.state} />
                    <View style={{
                        marginTop: 10,
                        padding: 5,
                    }}>
                        {qna}
                    </View>
                </View>
            </View>
        );
    }

}


const ImgSlider = ({ item }) => {
    // 이미지 업데이트가 안 되는 이유는 장고 문제가 아니라
    // 리액트 문제, 이미지에 timestamp를 넣어야 할 듯?

    return (
        <Image
            style={{
                height: parseInt(windowHeight * 0.35),
                width: parseInt(windowWidth),
                backgroundColor: 'red',
            }}
            key={item.item}
            source={{ uri: useStore.getState().picURL + item.item }}
        />
    );
}

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
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
    KeyboardAvoidingView,
    Platform,
    ScrollView
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { SliderBox } from "react-native-image-slider-box";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainPartyDetailPresenter(props) {
    console.log('@MainPartyDetailPresenter');
    const img = [
        "https://source.unsplash.com/1024x768/?nature",
        "http://192.168.1.243:4001/media/image/?imageName=mainParty 1.jpg",
        "http://192.168.1.243:4001/media/image/?imageName=mainParty 2.jpg",
    ];
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <FlatList
                    data={props.state.data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => <Detail item={item} type={props.state.showType}/>}
                    ListHeaderComponent = {<Header imageData={img} info={props.state.partyInfo} func={props.state.setShowType} />}

                    //ListFooterComponent={}
                />
            </View>
            <Footer props={props.state} />
        </SafeAreaView>
    );
}

export default MainPartyDetailPresenter;

const Header = ({imageData, info, func}) => {
    return(
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
                ><Text style={{fontSize: 16,}}>상세정보</Text></TouchableOpacity>
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
                ><Text style={{fontSize: 16,}}>리뷰</Text></TouchableOpacity>
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
                ><Text style={{fontSize: 16,}}>Q&A</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const Footer = ({props}) => {
    if(props.showType == '상세정보') {
        return(<DetailFooter props={props} />);
    } else if(props.showType == '리뷰') {
        return(<ReviewFooter props={props} />);
    } else {
        return(<QnAFooter props={props} />);
    }
}

const DetailFooter = ({props}) => {
    return(
        <View style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#BAE7AF',
            padding: 5,
            // ios
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            //aos
            elevation: 3,
        }}>
            <TouchableOpacity>
                <Text>신청하기</Text>
            </TouchableOpacity>

        </View>
    );
}

const ReviewFooter = ({props}) => {
    return(
        <KeyboardAvoidingView style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 5,
            minHeight: props.img != '' ? 180 : 40,
            // ios
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            //aos
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
                                style={{height: 100, width: 100}}
                                resizeMode='contain'
                                source={{uri : 'data:image/jpeg;base64,' + props.img}}
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
                                        height:20, 
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
                        <Icon name='image' size={23}/>
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

const QnAFooter = ({props}) => {
    return(
        <View style={{
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 5,
            // ios
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            //aos
            elevation: 3,
        }}>
            <View style={{
                flex: 8,
            }}>
                <TextInput
                    style={{
                        width: '100%',
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 20,
                        padding: 10,
                    }}
                />
            </View>
            
            <View style={{
                flex: 1.5,
                alignItems: 'center',
                marginLeft: 5,
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
    );
}

const Info = ({item}) => {
    return(
        <View style={{
            padding: 10,
        }}>

            <View style={{
                borderBottomWidth: 1,
                paddingBottom: 10,
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
                    <Icon name="pin" size={15} />
                    <Text style={{
                        marginLeft: 5,
                    }}>{item.place}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 2,
                }}>
                    <IconEntypo name="price-tag" size={15} />
                    <Text style={{
                        marginLeft: 5,
                    }}>{"남: "+item.priceM}</Text>
                    <Text style={{
                        marginLeft: 5,
                    }}>{"여: "+item.priceF}</Text>
                </View>

                <View style={{
                    flexDirection:  'row',
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
                                }}>{"1/"+item.ableM}</Text>
                            </View>                     
                            
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 10,
                            }}>
                                <Icon name="dot-fill" size={15} color="red" />
                                <Text style={{
                                marginLeft: 5,
                                }}>{"2/"+item.ableM}</Text>
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

const Detail = ({item, type}) => {
    if(type == '상세정보') {
        return(
            <View style={{
                padding: 15,
            }}>
                <Text>{item.item}</Text>
            </View>
        );
    } else if(type == '리뷰') {
        return(
            <View>

            </View>
        );
    } else {
        return(
            <View>
                
            </View>
        );
    }
    
}

const ImgSlider = ({item}) => {
    return(
        <Image
            style={{
                height: parseInt(windowHeight*0.35),
                width: parseInt(windowWidth),
                backgroundColor: 'red',
            }}
            source={{uri: item.item}}
        />
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
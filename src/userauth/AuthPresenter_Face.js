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
    Pressable,
    Modal,
    ImageBackground
}
from 'react-native'

import { useAuth } from '../../AppContext';

import Icon from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AuthPresenter_Face(props) {
    console.log('@AuthPresenter_Face');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={{
                    backgroundColor: 'white',
                }}>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 15,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '700',
                        }}>최소 3장 이상의 사진을 등록해주세요.</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Pic text={"메인"} func={props.state} id={0} />
                        <Pic text={"필수"} func={props.state} id={1} />
                        <Pic text={"필수"} func={props.state} id={2} />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Pic text={"선택"} func={props.state} id={3} />
                        <Pic text={"선택"} func={props.state} id={4} />
                        <Pic text={"선택"} func={props.state} id={5} />
                    </View>
                </View>

                <View style={{
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: '700',
                        
                    }}>사진 등록 주의사항</Text>

                    <View style={{
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                        <Text style={{

                        }}>본인의 얼굴을 알아볼 수 있는 밝은 정면의</Text>

                        <Text style={{

                        }}>대표 사진을 메인으로 등록해주세요.</Text>
                    </View>

                    <View style={{
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                        <Text style={{

                        }}>타인의 사진을 무단 도용 시, 관련 법에 따라</Text>

                        <Text style={{

                        }}>처벌을 받을 수 있습니다.</Text>
                    </View>

                </View>

                <TouchableOpacity
                    style={{
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#a6c1ee',
                    margin: 5,
                    marginTop: 10,
                    }}
                    onPress={() => props.state.verify()}
                >
                    <Text style={styles.textStyle}>업로드</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

export default AuthPresenter_Face;

const GalleryOrCamera = ({props}) => {
    return(
        <Modal
        animationType='slide'//'fade'
        transparent={true}
        visible={props.func.modalVisiable}
        >
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
            }}>
                <ImageBackground style={{
                        //backgroundColor: 'black',
                    }}
                    blurRadius={90}
                >
                    <View style={{
                        margin: 5,
                        marginLeft: 15,
                        marginRight: 15,
                        backgroundColor: 'black',
                        borderRadius: 10,
                    }}>
                        <View>
                            <Pressable
                                style={{
                                    backgroundColor: 'black',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 15,
                                    borderRadius: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                }}
                                onPress={() => props.func.openGallery(props.id)}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    color: 'white',
                                }}>갤러리에서 불러오기</Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    backgroundColor: 'black',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 15,
                                    borderRadius: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                }}
                                onPress={() => props.func.openCamera(props.id)}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    color: 'white',
                                }}>카메라에서 불러오기</Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    backgroundColor: 'black',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 15,
                                    borderRadius: 10,
                                }}
                                onPress={() => props.func.erazeImage(props.id)}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    color: 'white',
                                }}>이미지 삭제하기</Text>
                            </Pressable>
                        </View>
                    </View>    

                    <Pressable
                        style={{
                            backgroundColor: 'black',
                            alignItems: 'center',
                            borderRadius: 10,
                            padding: 15,
                            margin: 15,
                        }}
                        onPress={() => props.func.setModalVisiable(false)}
                    >
                        <Text style={{
                            fontSize: 15,
                            color: 'white',
                        }}>닫기</Text>
                    </Pressable>
                </ImageBackground>
            </View>

        </Modal>
    );
}

const Pic = (props) => {
    const ShowAvatar = ({props}) => {
        return(
            <View style={{
                alignItems: 'center',                
            }}>
                <Icon name='person' size={30} />
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'gray',
                    height: '60%',
                    width: '100%',
                    bottom: -14,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: 'white',
                    }}>{props.text}</Text>
                </View>
            </View>
            
        );
    }
    
    return(
        <Pressable style={{
            flex: 1,
            height: 120,
            backgroundColor: 'lightgray',
            margin: 10,
            borderRadius: 10,
            justifyContent: 'center',
        }}
            onPress={() => {
                props.func.setModalVisiable(true, props.id)
            }}
        >
            { 
                props.id == 0 && props.func.mainPic[0] != ''    && props.func.mainPic[0] != '-1' ? <ShowPic props={props} /> :
                props.id == 1 && props.func.requirePic[0] != '' && props.func.requirePic[0] != '-1' ? <ShowPic props={props} /> :
                props.id == 2 && props.func.requirePic[1] != '' && props.func.requirePic[1] != '-1' ? <ShowPic props={props} /> :
                props.id == 3 && props.func.extraPic[0] != ''   && props.func.extraPic[0] != '-1'   ? <ShowPic props={props} /> :
                props.id == 4 && props.func.extraPic[1] != ''   && props.func.extraPic[1] != '-1'   ? <ShowPic props={props} /> :
                props.id == 5 && props.func.extraPic[2] != ''   && props.func.extraPic[2] != '-1'   ? <ShowPic props={props} /> : 
                <ShowAvatar props={props} /> 
            }

            {
                props.id == props.func.curModalID ? <GalleryOrCamera props={props} /> : <></>
            }

        </Pressable>
    );
}

const ShowPic = ({props}) => {
    return(
        <View>
            <Image
                style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                }}
                source={{
                    uri :  
                    (props.id == 0 ? (props.func.mainPic[0].length <= 100 ? props.func.picURL + props.func.mainPic[0] : 'data:image/jpeg;base64,' + props.func.mainPic[0]) :
                    props.id == 1 ? (props.func.requirePic[0].length <= 100 ? props.func.picURL + props.func.requirePic[0] : 'data:image/jpeg;base64,' + props.func.requirePic[0]) :
                    props.id == 2 ? (props.func.requirePic[1].length <= 100 ? props.func.picURL + props.func.requirePic[1] : 'data:image/jpeg;base64,' + props.func.requirePic[1]) :
                    props.id == 3 ? (props.func.extraPic[0].length <= 100 ? props.func.picURL + props.func.extraPic[0] : 'data:image/jpeg;base64,' + props.func.extraPic[0]) :
                    props.id == 4 ? (props.func.extraPic[1].length <= 100 ? props.func.picURL + props.func.extraPic[1] : 'data:image/jpeg;base64,' + props.func.extraPic[1]) :
                    props.id == 5 ? (props.func.extraPic[2].length <= 100 ? props.func.picURL + props.func.extraPic[2] : 'data:image/jpeg;base64,' + props.func.extraPic[2]) : ' ')
                }}
            />
            {
                props.id == 0 && useAuth.getState().isReturnedMainPic.includes('0') ? <ImgReturn /> :
                props.id == 1 && useAuth.getState().isReturnedRequirePic.includes('0') ? <ImgReturn /> :
                props.id == 2 && useAuth.getState().isReturnedRequirePic.includes('1') ? <ImgReturn /> :
                props.id == 3 && useAuth.getState().isReturnedExtraPic.includes('0') ? <ImgReturn /> :
                props.id == 4 && useAuth.getState().isReturnedExtraPic.includes('1') ? <ImgReturn /> :
                props.id == 5 && useAuth.getState().isReturnedExtraPic.includes('2') ? <ImgReturn /> : <></>
            }            
        </View>
        
    );
}

const ImgReturn = () => {
    return(
        <View style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: 'red',
            borderRadius: 10,
            opacity: 0.5,
            justifyContent: 'center',
        }}>
            <View style={{
                height: '20%',
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    color: 'white',
                }}>부적절한 이미지</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
        justifyContent: 'space-between',
    },
});
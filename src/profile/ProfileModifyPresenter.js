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
    Pressable,
    Modal,
    ImageBackground,
    ScrollView,
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { useRegister } from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileModifyPresenter(props) {
    console.log('@ProfileModifyPresenter');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}>

                <ImageArea props={props} />
                <InfoArea props={props} />
                <IntroArea props={props} />
                
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

            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileModifyPresenter;

const ImageArea = ({ props }) => {
    return (
        <View>
            <View style={{
                backgroundColor: 'white',
            }}>

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
        </View>
    );
}

const InfoArea = ({ props }) => {
    return (
        <View>
            <View style={[styles.element, { backgroundColor: 10, }]}>
                <Text style={styles.left}>이메일</Text>
                <Text>{useRegister.getState().email}</Text>
            </View>

            <View style={[styles.element, { backgroundColor: 10, }]}>
                <Text style={styles.left}>성명</Text>
                <Text>{useRegister.getState().name + ' / '}{useRegister.getState().sex == '0' ? '남' : '여'}</Text>
            </View>

            <View style={[styles.element, { backgroundColor: 10, }]}>
                <Text style={styles.left}>핸드폰</Text>
                <Text>{useRegister.getState().phone}</Text>
            </View>

            <View style={[styles.element, { backgroundColor: 10, }]}>
                <Text style={styles.left}>생년월일</Text>
                <Text>{useRegister.getState().birth}</Text>
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>닉네임</Text>
                <TextInput style={styles.right}
                    textAlign='right'
                    placeholder='닉네임을 입력해주세요.'
                    onChangeText={text => useRegister.getState().setNickname(text)}
                    onSubmitEditing={() => props.state.setWhichItem('학력')}
                />
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>학력</Text>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => {
                        props.state.setWhichItem('학력');
                    }}
                >
                    {
                        props.state.getWhichItem() == '학력'
                            ?
                            <ModalPopUp props={props.state} item={props.state.gradeData} />
                            :
                            <></>
                    }
                    <Text>{props.state.selectedGrade == "" ? '선택해주세요' : props.state.selectedGrade}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>학교명(선택)</Text>
                <TextInput style={styles.right}
                    placeholder='학교 이름을 입력해주세요.'
                    onChangeText={text => useRegister.getState().setEduName(text)}
                />
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>지역</Text>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => {
                        props.state.setWhichItem('지역');
                    }}
                >
                    {
                        props.state.getWhichItem() == '지역'
                            ?
                            <ModalPopUp_Region props={props.state} item={props.state.regionData} />
                            :
                            <></>
                    }
                    <Text>{props.state.selectedRegion == "" ? '선택해주세요' : props.state.selectedRegion + ' ' + props.state.selectedRegionAddon}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>키</Text>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => {
                        props.state.setWhichItem('키');
                    }}
                >
                    {
                        props.state.getWhichItem() == '키'
                            ?
                            <ModalPopUp props={props.state} item={props.state.heightData} />
                            :
                            <></>
                    }
                    <Text>{props.state.selectedHeight == "" ? '선택해주세요' : props.state.selectedHeight}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>체형</Text>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => {
                        props.state.setWhichItem('체형');
                    }}
                >
                    {
                        props.state.getWhichItem() == '체형'
                            ?
                            <ModalPopUp props={props.state} item={props.state.bodyData} />
                            :
                            <></>
                    }
                    <Text>{props.state.selectedBody == "" ? '선택해주세요' : props.state.selectedBody}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>종교</Text>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => {
                        props.state.setWhichItem('종교');
                    }}
                >
                    {
                        props.state.getWhichItem() == '종교'
                            ?
                            <ModalPopUp props={props.state} item={props.state.religionData} />
                            :
                            <></>
                    }
                    <Text>{props.state.selectedReligion == "" ? '선택해주세요' : props.state.selectedReligion}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>흡연</Text>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => {
                        props.state.setWhichItem('흡연');
                    }}
                >
                    {
                        props.state.getWhichItem() == '흡연'
                            ?
                            <ModalPopUp props={props.state} item={props.state.smokeData} />
                            :
                            <></>
                    }
                    <Text>{props.state.selectedSmoke == "" ? '선택해주세요' : props.state.selectedSmoke}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.element}>
                <Text style={styles.left}>음주</Text>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => {
                        props.state.setWhichItem('음주');
                    }}
                >
                    {
                        props.state.getWhichItem() == '음주'
                            ?
                            <ModalPopUp props={props.state} item={props.state.alcoholData} />
                            :
                            <></>
                    }
                    <Text>{props.state.selectedAlcohol == "" ? '선택해주세요' : props.state.selectedAlcohol}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const IntroArea = ({props}) => {
    return (
        <View>
            <View style={{
                backgroundColor: 'white',
                margin: 5,
                elevation: 3,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                }}>
                    <Text style={{
                        marginLeft: 10,
                    }}>저의 성격은</Text>
                    <Text style={{
                        marginRight: 10,
                    }}>{props.state.character.length}</Text>
                </View>

                <TextInput
                    style={{
                        height: parseInt(windowHeight / 4)
                    }}
                    multiline
                    textAlignVertical='top'
                    numberOfLines={200}
                    onChangeText={text => props.state.setCharacter(text)}
                />
            </View>

            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>자신에 대한 이야기를 통해 이성에게 매력을 어필해보세요.</Text>
                <Text>정성스러울수록 상대방에게 호감을 받을 확률도 올라갑니다.</Text>
            </View>

            <View style={{
                backgroundColor: 'white',
                margin: 5,
                elevation: 3,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                }}>
                    <Text style={{
                        marginLeft: 10,
                    }}>저를 소개합니다.</Text>

                    <Text style={{
                        marginRight: 10,
                    }}>{props.state.aboutMe.length}</Text>
                </View>
                <TextInput
                    style={{
                        height: parseInt(windowHeight / 4),
                    }}
                    multiline
                    textAlignVertical='top'
                    numberOfLines={200}
                    onChangeText={text => props.state.setAboutMe(text)}
                />
            </View>
        </View>
    );
}

const ModalPopUp = (props) => {

    const items = props.item;
    const f = props.props;

    items.length == 0 ? f.selItem(false, -1) : {};

    return (
        <Modal
            animationType="slide"
            transparent={true}
        //visible={f.getWhichUID() == item.uid ? f.getPartyApply() : {}}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>

                <View style={{
                    minHeight: 150,
                    maxHeight: (60 * items.length) > parseInt(windowHeight / 2) ? parseInt(windowHeight / 2) : (60 * items.length),
                    minWidth: parseInt(windowWidth / 1.5),
                    backgroundColor: "white",
                    borderRadius: 20,
                    // ios
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    // aos
                    elevation: 5
                }}>
                    <View>
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginRight: 10,
                                marginTop: 10,
                            }}
                            onPress={() => f.selItem(false, -1)}
                        >
                            <Icon name='x' size={20} />
                        </Pressable>
                    </View>

                    <View style={{
                        alignItems: "center",
                    }}>
                        <FlatList
                            style={{
                                marginBottom: 50,
                            }}
                            data={items}
                            renderItem={item => ModalItem(f, item)}
                        />
                    </View>
                </View>
            </View>

        </Modal>
    );
}

const ModalPopUp_Region = (props) => {

    const items = props.item;
    const f = props.props;

    items.length == 0 ? f.selItem(false, -1) : {};

    return (
        <Modal
            animationType="slide"
            transparent={true}
        //visible={f.getWhichUID() == item.uid ? f.getPartyApply() : {}}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>

                <View style={{
                    minHeight: 150,
                    maxHeight: (60 * items.length) > parseInt(windowHeight / 2) ? parseInt(windowHeight / 2) : (60 * items.length),
                    //minWidth: parseInt(windowWidth/3),
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 10,
                    // ios
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    // aos
                    elevation: 5
                }}>
                    <View>
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginRight: 10,
                                marginTop: 10,
                            }}
                            onPress={() => f.selItem(false, -1)}
                        >
                            <Icon name='x' size={20} />
                        </Pressable>
                    </View>

                    <View style={{
                        alignItems: "center",
                        flexDirection: 'row',
                    }}>
                        <FlatList
                            style={{
                                marginBottom: 50,
                            }}
                            data={items}
                            renderItem={item => ModalItem_Region(f, item, '시도')}
                        />
                        <FlatList
                            style={{
                                marginBottom: 50,
                            }}
                            data={f.regionAddonData}
                            renderItem={item => ModalItem_Region(f, item, '')}
                        />
                    </View>
                </View>
            </View>

        </Modal>
    );
}

const ModalItem = (f, item) => {

    return (
        <Pressable
            style={{
                height: 40,
                width: 200,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 5,
            }}
            onPress={() => f.selItem(true, item.index)}
        >
            <Text style={styles.textStyle}>{item.item}</Text>
        </Pressable>
    );
}

const ModalItem_Region = (f, item, sido) => {

    return (
        <Pressable
            style={{
                height: 40,
                width: sido != '' ? (f.selectedRegion == '' ? 200 : 120) : 120,
                marginRight: sido != '' ? (f.selectedRegion == '' ? 0 : 5) : 0,
                backgroundColor: sido != '' ? (f.selectedRegion != item.item ? 0 : 30) : 0,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                padding: 2,
            }}
            onPress={() => { f.setRegion(sido, item.index) }}
        >
            <Text style={styles.textStyle}>{item.item}</Text>
        </Pressable>
    );
}

const GalleryOrCamera = ({ props }) => {
    return (
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
    const ShowAvatar = ({ props }) => {
        return (
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

    return (
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
                props.id == 0 && props.func.mainPic != '' && props.func.mainPic != '-1' ? <ShowPic props={props} /> :
                    props.id == 1 && props.func.requirePic[0] != '' && props.func.requirePic[0] != '-1' ? <ShowPic props={props} /> :
                        props.id == 2 && props.func.requirePic[1] != '' && props.func.requirePic[1] != '-1' ? <ShowPic props={props} /> :
                            props.id == 3 && props.func.extraPic[0] != '' && props.func.extraPic[0] != '-1' ? <ShowPic props={props} /> :
                                props.id == 4 && props.func.extraPic[1] != '' && props.func.extraPic[1] != '-1' ? <ShowPic props={props} /> :
                                    props.id == 5 && props.func.extraPic[2] != '' && props.func.extraPic[2] != '-1' ? <ShowPic props={props} /> :
                                        <ShowAvatar props={props} />
            }

            {
                props.id == props.func.curModalID ? <GalleryOrCamera props={props} /> : <></>
            }

        </Pressable>
    );
}

const ShowPic = ({ props }) => {
    return (
        <Image
            style={{
                height: '100%',
                width: '100%',
                borderRadius: 10,
            }}
            source={{
                uri:
                    (props.id == 0 ? (props.func.mainPic.length <= 100 ? props.func.picURL + props.func.mainPic : 'data:image/jpeg;base64,' + props.func.mainPic) :
                        props.id == 1 ? (props.func.requirePic[0].length <= 100 ? props.func.picURL + props.func.requirePic[0] : 'data:image/jpeg;base64,' + props.func.requirePic[0]) :
                            props.id == 2 ? (props.func.requirePic[1].length <= 100 ? props.func.picURL + props.func.requirePic[1] : 'data:image/jpeg;base64,' + props.func.requirePic[1]) :
                                props.id == 3 ? (props.func.extraPic[0].length <= 100 ? props.func.picURL + props.func.extraPic[0] : 'data:image/jpeg;base64,' + props.func.extraPic[0]) :
                                    props.id == 4 ? (props.func.extraPic[1].length <= 100 ? props.func.picURL + props.func.extraPic[1] : 'data:image/jpeg;base64,' + props.func.extraPic[1]) :
                                        props.id == 5 ? (props.func.extraPic[2].length <= 100 ? props.func.picURL + props.func.extraPic[2] : 'data:image/jpeg;base64,' + props.func.extraPic[2]) : ' ')
            }}
        />
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
        //justifyContent: 'space-between',
    },
    element: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginTop: 3,
        marginRight: 5,
        marginLeft: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    left: {
    },
    right: {
    },
    touchArea: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '90%',
        width: '50%',
    }
});
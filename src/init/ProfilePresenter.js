import React, {useRef, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Modal,
    Pressable,
    FlatList,
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { useRegister } from '../../AppContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfilePresenter(props) {
    console.log('@ProfilePresenter');

    const end = useRef(null);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                ref={end}
                style={styles.main}>

                <View style={[styles.element, {backgroundColor: 10,}]}>
                    <Text style={styles.left}>이메일</Text>
                    <Text>{useRegister.getState().email}</Text>
                </View>

                <View style={[styles.element, {backgroundColor: 10,}]}>
                    <Text style={styles.left}>성명</Text>
                    <Text>{useRegister.getState().name + ' / '}{useRegister.getState().sex == '0' ? '남' : '여'}</Text>
                </View>

                <View style={[styles.element, {backgroundColor: 10,}]}>
                    <Text style={styles.left}>핸드폰</Text>
                    <Text>{useRegister.getState().phone}</Text>
                </View>

                <View style={[styles.element, {backgroundColor: 10,}]}>
                    <Text style={styles.left}>생년월일</Text>
                    <Text>{useRegister.getState().birth}</Text>
                </View>

                <View style={[styles.element, {
                    backgroundColor: props.state.nicknameCheck ? 'white' : 'red',
                }]}>
                    <Text style={styles.left}>닉네임</Text>
                    <TextInput style={styles.right}
                        textAlign='right'
                        placeholder='닉네임을 입력해주세요.'
                        onChangeText={text => {
                            props.state.nicknameVerify(text);
                        }}
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

                <Pressable
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
                    <Text style={styles.textStyle}>다음</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfilePresenter;

const ModalPopUp = (props) => {
    
    const items = props.item;
    const f = props.props;

    items.length == 0 ? f.selItem(false, -1) : {};

    return(
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
                    maxHeight: (60*items.length) > parseInt(windowHeight/2) ? parseInt(windowHeight/2) : (60*items.length),
                    minWidth: parseInt(windowWidth/1.5),
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
                            renderItem={ item => ModalItem(f, item) }
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

    return(
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
                    maxHeight: (60*items.length) > parseInt(windowHeight/2) ? parseInt(windowHeight/2) : (60*items.length),
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
                            renderItem={ item => ModalItem_Region(f, item, '시도') }
                        />
                        <FlatList
                            style={{
                                marginBottom: 50,
                            }}
                            data={f.regionAddonData}
                            renderItem={ item => ModalItem_Region(f, item, '') }
                        />
                    </View>
                </View>
            </View>

        </Modal>
    );
}

const ModalItem = (f, item) => {

    return(
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

    return(
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
            onPress={() => {f.setRegion(sido, item.index)}}
        >
            <Text style={styles.textStyle}>{item.item}</Text>
        </Pressable>
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
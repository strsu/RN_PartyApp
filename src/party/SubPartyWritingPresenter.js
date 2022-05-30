import React, { useState } from 'react';
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
}
    from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CheckBox from '@react-native-community/checkbox';

const windowWidth = parseInt(Dimensions.get('window').width);
const windowHeight = Dimensions.get('window').height;

const Header = (props) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 40,
            backgroundColor: 'gray',
        }}>
            <TouchableOpacity
                style={{
                    marginLeft: 10,
                }}
                onPress={() => props.props.props.navigation.goBack()}
            >
                <Icon name="arrow-left" size={25} color='black' />
            </TouchableOpacity>

            <TouchableOpacity style={{
                marginRight: 10,
            }}
                onPress={() => { props.props.state.postWriting() }}
            >
                <Text>완료</Text>
            </TouchableOpacity>

        </View>
    );
}

function SubPartyWritingPresenter(props) {
    console.log('@SubPartyWritingPresenter');

    const CategoryMenu = () => {
        // https://www.npmjs.com/package/react-native-modal-dropdown

        //const category = useWriting(state => state.category);
        //const setCategory = useWriting(state => state.setCategory);

        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {
                    props.state.filter.slice(1).map(data => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: props.state.category.includes(data) ? 'red' : 'white',
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderWidth: 1,
                                borderRadius: 10,
                                marginRight: 10,
                                margin: 2,
                            }}
                                onPress={() => props.state.setCategory(data)}
                            >
                                <Text>{data}</Text>
                            </TouchableOpacity>
                        );

                    })
                }
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            <ScrollView style={styles.main}>

                <View style={{
                    padding: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    justifyContent: 'space-between'
                }}>

                    <View style={{
                        padding: 5,
                        flex: 1,
                        //justifyContent: 'center',
                        backgroundColor: 'white',
                    }}>
                        <CategoryMenu />
                    </View>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginRight: 10,
                                }}>
                                    <CheckBox
                                        disabled={false}
                                        value={props.state.partyCheck}
                                        onValueChange={(newValue) => props.state.setCheck()}
                                    />
                                    <Text>내가쓰는 하트 파티</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginRight: 10,
                                }}>
                                    <CheckBox
                                        disabled={false}
                                        value={!props.state.partyCheck}
                                        onValueChange={(newValue) => props.state.setCheck()}
                                    />
                                    <Text>신청자가 쓰는 하트 파티</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Icon name='question' size={22} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            paddingLeft: 30,
                            paddingRight: 30,
                        }}>
                            {
                                props.state.partyCheck ?
                                <Text>* 파티를 생성하는데 5하트를 소모하지만, 참여자로부터 내 프로필을 보호할 수 있어요.</Text> :
                                <Text>* 파티를 하트소모 없이 생성하지만, 참여자로부터 내 프로필을 보호할 수 없어요.</Text>
                            }
                        </View>
                    </View>
                    

                    <View style={{
                        height: 60,
                        backgroundColor: 'write',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                    }}>
                        <TextInput
                            placeholder="제목"
                            value={props.state.title}
                            onChangeText={newText => props.state.setTitle(newText)}
                            style={{
                            }}
                        />
                    </View>

                    <View style={{
                        height: '100%',
                        width: '100%',
                        marginTop: 10,
                    }}>
                        {
                            props.state.getImage() == "" ?
                                <></> :
                                <View>
                                    <Image
                                        style={{
                                            height: 300,
                                            width: '100%',
                                        }}
                                        source={{
                                            uri: props.state.getImage().length > 200 ?
                                                'data:image/jpeg;base64,' + props.state.getImage() :
                                                props.state.getImage()
                                        }}
                                    />
                                    <TouchableOpacity style={{
                                        position: 'absolute',
                                        right: 15,
                                        top: 10,
                                        height: 25,
                                        width: 25,
                                        backgroundColor: 'white',
                                        borderRadius: 100,
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                        onPress={() => props.state.removeImage()}
                                    >
                                        <Icon name="dash" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>

                        }
                        <TextInput
                            multiline
                            numberOfLines={20}
                            placeholder="본문"
                            underlineColorAndroid="transparent"
                            returnKeyType='next'
                            value={props.state.content}
                            onChangeText={newText => props.state.setContent(newText)}
                            style={{
                                textAlignVertical: 'top',
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{
                flexDirection: 'row',
                padding: 10,
                borderTopWidth: 1,
                borderTopColor: 'lightgray',
            }}>
                <TouchableOpacity
                    onPress={() => props.state.setModalVisiable(true)}
                >
                    {
                        props.state.modalVisiable ?
                            <GalleryOrCamera props={props.state} /> :
                            <></>
                    }
                    <Icon name="image" size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ 
                        flexDirection: 'row',
                        marginLeft: 10, 
                        alignItems: 'center',
                    }}
                    onPress={() => props.state.setCalendarModal()}
                >
                    {
                        props.state.setCalendarModal ?
                            <UserCalendar props={props.state} /> :
                            <></>
                    }
                    <Icon name="calendar" size={30} color="black" />

                    <View>
                        {
                            Object.keys(props.state.markedDates).length > 0 ?
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 16,
                                color: 'black',
                            }}
                            >{Object.keys(props.state.markedDates)[0]}</Text> : <></>
                        }
                    </View>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    );
}

export default SubPartyWritingPresenter;

const GalleryOrCamera = ({ props }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.modalVisiable}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    height: 150,
                    width: parseInt(windowWidth / 2),
                    backgroundColor: 'white',
                    elevation: 3,
                }}>
                    <View>
                        <Pressable
                            style={{
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: 'gray',
                            }}
                            onPress={() => props.openGallery()}
                        >
                            <Text>갤러리</Text>
                        </Pressable>
                        <Pressable
                            style={{
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 3,
                                borderBottomWidth: 1,
                                borderBottomColor: 'gray',
                            }}
                            onPress={() => props.openCamera()}
                        >
                            <Text>카메라</Text>
                        </Pressable>
                        <Pressable
                            style={{
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 3,
                            }}
                            onPress={() => props.setModalVisiable(false)}
                        >
                            <Text>닫기</Text>
                        </Pressable>
                    </View>

                </View>

            </View>

        </Modal>
    );
}

const UserCalendar = ({props}) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.calendarModalVisiable}
        >
            <View style={{
                backgroundColor: 'white',
                marginLeft: 30,
                marginRight: 30,
                marginTop: 150,
                padding: 10,

                elevation: 3,
                borderWidth: 1,
                borderColor: 50,
            }}>
                <TouchableOpacity style={{
                    alignItems: 'flex-end',
                    marginBottom: 5,
                    justifyContent: 'center',
                }}
                    onPress={() => props.setCalendarModal()}
                >
                    <Icon name='x' size={20}/>
                </TouchableOpacity>
                <View>
                    <Calendar
                        minDate={props.minDate}
                        onDayPress={day => {
                            props.setPeriod(day);
                        }}
                        enableSwipeMonths={true}
                        markingType={'period'}
                        markedDates={props.markedDates}
                    //displayLoadingIndicator={true}
                    />
                </View>
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
        margin: 2,
    },
});
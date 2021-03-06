import React, {useState} from 'react';
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

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Octicons';

const windowWidth = parseInt(Dimensions.get('window').width);
const windowHeight = Dimensions.get('window').height;

const Header = (props) => {
    return(
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
                onPress={()=> props.props.props.navigation.goBack()}
            >
                <Icon name="arrow-left" size={25} color='black'/>
            </TouchableOpacity>
            
            <TouchableOpacity style={{
                marginRight: 10,
            }}
                onPress={() => {props.props.state.postWriting()}}
            >
                <Text>완료</Text>
            </TouchableOpacity>

        </View>
    );
}

function BoardWritingPresenter(props) {
    console.log('@BoardWritingPresenter');

    const CategoryMenu = () => {
        // https://www.npmjs.com/package/react-native-modal-dropdown
    
        //const category = useWriting(state => state.category);
        //const setCategory = useWriting(state => state.setCategory);
    
        return(
            <ModalDropdown 
                options={props.state.filter}
                onSelect={(val) => {
                    //props.state.setCategory(props.props.route.params.filter[val])
                    props.state.setCategory(props.state.filter[val])
                }}
                //defaultIndex={{selectValue}}
                defaultValue={"태그 선택"}
                style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                }}
                textStyle={{
                    fontSize: 15,
                    fontWeight: "500",
                }}
                dropdownStyle={{
                    width: 100,
                    height: 60*3,
                    fontSize: 15,
                    fontWeight: "400",
                }}
                dropdownTextStyle={{
                    borderBottomWidth: 1,
    
                }}
                dropdownTextHighlightStyle={{
                    fontWeight: "700",
                }}
                showsVerticalScrollIndicator={true}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                    }}><Text>{props.state.getCategory() != "" ? props.state.getCategory() : "태그 선택"}</Text></View>
                    
                    <View style={{
                        marginRight: 10,
                    }}><Icon name="chevron-down" size={20} color="#BAE7AF"/></View>
                    
                </View>
            </ModalDropdown>
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
                        height: 30,
                        width: 120,
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        elevation: 3,
                    }}>
                        <CategoryMenu />
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
                                    source={{uri: props.state.getImage().length > 200 ? 
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
                                    <Icon name="dash" size={20} color="red"/>
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
            </View>
        </SafeAreaView>
    );
}

export default BoardWritingPresenter;

const GalleryOrCamera = ({props}) => {
    return(
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
                    width: parseInt(windowWidth/2),
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
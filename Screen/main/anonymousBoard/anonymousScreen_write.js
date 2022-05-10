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
    Dimensions
}
from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import { QueryClient, useQuery } from 'react-query'
import Icon from 'react-native-vector-icons/Octicons';

import {getData} from "../../../API/crud";
import { useWriting } from '../../../AppContext';

// set 함수를 통해서만 상태를 변경할 수 있다


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CategoryMenu = ({filter}) => {
    // https://www.npmjs.com/package/react-native-modal-dropdown
    const filters = filter;
    const [selectValue, setselectValue] = useState(0);

    const category = useWriting(state => state.category);
    const setCategory = useWriting(state => state.setCategory);

    return(
        <ModalDropdown 
            options={filters}
            onSelect={(val) => {
                setCategory(filters[val])
            }}
            //defaultIndex={{selectValue}}
            defaultValue={"카테고리를 선택해주세요"}
            style={{
                backgroundColor: 'white',
                justifyContent: 'center',
            }}
            textStyle={{
                fontSize: 15,
                fontWeight: "500",
            }}
            dropdownStyle={{
                width: '90%',
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
                }}><Text>{category != "" ? category : "카테고리를 선택해주세요."}</Text></View>
                
                <View style={{
                    marginRight: 10,
                }}><Icon name="chevron-down" size={20} color="#BAE7AF"/></View>
                
            </View>
        </ModalDropdown>
    );
}


function AnonymousScreen_Write(props) {
    console.log('@AnonymousScreen_write');

    const setKind = useWriting(state => state.setKind);
    const setTitle = useWriting(state => state.setTitle);
    const setContent = useWriting(state => state.setContent);
    const setImg = useWriting(state => state.setImg);

    const img = useWriting(state => state.img);

    setKind('anony');

    React.useLayoutEffect(() => {
        // 부모 속성을 가져온 다음에 옵션으로 bar를 안 보이게 처리해야 한다.
        props.navigation.getParent().setOptions({
            tabBarStyle: { display: "none" },
        });
    }, []);

    const openGallery = () => {
        let options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };
    
        launchImageLibrary(options, response => {
            //console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if(response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if(response.customeButton) {
                console.log('User tapped custom button: ', response.customeButton);
            } else {
                //const source = {uri: 'data:image/jpeg;base64,' + response.base64};
                //setimageUriGallary(...imageUriGallary, response.assets[0].base64);
                console.log(response.assets[0].height);
                console.log(response.assets[0].width);
                console.log(response.assets[0].fileSize);
                setImg(response.assets[0].base64);
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.main}>
                <View style={{
                    marginLeft: 10,
                }}>
                    <View style={{
                        // image area
                        height: 100,
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                    }}>
                        <TouchableOpacity
                            style={{
                                height: '70%',
                                width: '20%',
                                backgroundColor: 'white',
                                elevation: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => openGallery()}
                        >
                            {
                                img == ""
                                ?
                                <Icon name="image" size={30} color="black" />
                                :
                                <Image
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    source={{uri: 'data:image/jpeg;base64,' + img}}
                                />
                            }                        
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        height: 60,
                        backgroundColor: 'write',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                    }}>
                        <TextInput
                            placeholder="제목"
                            onChangeText={newText => setTitle(newText)}
                            style={{
                            }}
                        />
                    </View>

                    <View style={{
                        borderBottomWidth: 1,
                        height: 60,
                        justifyContent: 'center',
                    }}>
                        <CategoryMenu filter={props.route.params.filter}/>
                    </View>

                    <View style={{
                        height: '100%',
                        width: '100%',
                        marginTop: 10,
                    }}>
                        <TextInput
                            multilineasdasd
                            numberOfLines={15}
                            placeholder="본문"
                            underlineColorAndroid="transparent"
                            returnKeyType='next'
                            onChangeText={newText => setContent(newText)}
                            style={{
                                textAlignVertical: 'top',
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AnonymousScreen_Write;

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
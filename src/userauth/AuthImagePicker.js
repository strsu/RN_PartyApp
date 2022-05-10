import React from 'react';
import {
    Modal,
    View,
    ImageBackground,
    Pressable,
    Image,
    Text,
} from 'react-native'

import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Octicons';
import { useAuth } from '../../AppContext';
import { customAxios } from '../customAxios';

class AuthImagePicker extends React.Component {

    constructor(props) {
        super(props);
        console.log('@AuthImagePicker');

        this.state = {
            curModalID: -1,
            modalVisiable: false,
            setModalVisiable: this.setModalVisiable.bind(this),
            openGallery: this.openGallery.bind(this),
            openCamera: this.openCamera.bind(this),
            erazeImage: this.erazeImage.bind(this),

            GalleryOrCamera: this.GalleryOrCamera.bind(this),
            Pic: this.Pic.bind(this),
            ShowPic: this.ShowPic.bind(this),
            ImgReturn: this.ImgReturn.bind(this),

            extraPic: ['','',''],
            picURL: 'http://192.168.1.243:4001/media/image/?imageName=',

            isExtraChange: false,

            verify: this.verify.bind(this),

            returnedPic:
                this.props.cls == 'Face' ? useAuth.getState().isReturnedPic :
                this.props.cls == 'professional' ? useAuth.getState().isReturnedProfessional :
                this.props.cls == 'businessman' ? useAuth.getState().isReturnedBusinessman :
                this.props.cls == 'highSalary' ? useAuth.getState().isReturnedHighSalary :
                this.props.cls == '100million' ? useAuth.getState().isReturnedA100million :
                this.props.cls == 'gangnamAPT' ? useAuth.getState().isReturnedGangnamAPT :
                this.props.cls == 'expensiveAPT' ? useAuth.getState().isReturnedExpensiveAPT :
                this.props.cls == 'foreignCar' ? useAuth.getState().isReturnedForeignCar :
                this.props.cls == 'SuperCar' ? useAuth.getState().isReturnedSuperCar :
                this.props.cls == 'HighAsset' ? useAuth.getState().isReturnedHighAsset :
                this.props.cls == 'ultraHighAsset' ? useAuth.getState().isReturnedUltraHighAsset :
                this.props.cls == 'eliteFamily' ? useAuth.getState().isReturnedEliteFamily :
                this.props.cls == 'highCaliberFamily' ? useAuth.getState().isReturnedHighCaliberFamily :
                this.props.cls == 'prestigiousUniv' ? useAuth.getState().isReturnedPrestigiousUniv :
                this.props.cls == 'aboardPrestigiousUniv' ? useAuth.getState().isReturnedAboardPrestigiousUniv :
                this.props.cls == 'height' ? useAuth.getState().isReturnedHeight : '',
        };

        
    }

    componentDidMount() {
        switch(this.props.cls) {
            case 'gangnamAPT': {
                this.setState({
                    extraPic: useAuth.getState().gangnamAPT == '' ? ['','',''] : useAuth.getState().gangnamAPT
                });
                break;
            }
        }
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return(
            <View style={{
                flexDirection: 'row',
            }}>
                <this.Pic id={0} />
                <this.Pic id={1} />
                <this.Pic id={2} />
            </View>
        );
    }

    setModalVisiable(state, id) {
        this.setState({
            modalVisiable: state,
            curModalID: id,
        });
    }

    openGallery(id) {
        this.setState({
            modalVisiable: false,
            curModalID: -1,
        });
        ImagePicker.openPicker({
            multiple: true,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 1,
        }).then(image => {
            const len = image.length > 3 ? 3 : image.length;
            if(id == 0) {
                for(let i=0; i<len; i++) {
                    switch(i) {
                        case 0: this.setState({extraPic: [image[0].data].concat(this.state.extraPic.slice(1,3)), isExtraChange: true }); break;
                        case 1: this.setState({extraPic: this.state.extraPic.slice(0,1).concat(image[1].data).concat(this.state.extraPic.slice(2,3)), isExtraChange: true }); break;
                        case 2: this.setState({extraPic: this.state.extraPic.slice(0,2).concat(image[2].data), isExtraChange: true }); break;
                    }
                }
            } else if(id == 1) {
                for(let i=0; i<len; i++) {
                    switch(i) {
                        case 0: this.setState({extraPic: this.state.extraPic.slice(0,1).concat(image[0].data).concat(this.state.extraPic.slice(2,3)), isExtraChange: true }); break;
                        case 1: this.setState({extraPic: this.state.extraPic.slice(0,2).concat(image[1].data), isExtraChange: true }); break;
                    }
                }
            } else {
                this.setState({extraPic: this.state.extraPic.slice(0,2).concat(image[0].data), isExtraChange: true });
            }

            this.verify();
            
        }).catch((err) => {

        });
    }

    openCamera(id) {
        this.setState({
            modalVisiable: false,
            curModalID: -1,
        });
        ImagePicker.openCamera({
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 1,
        }).then(image => {
            switch(id) {
                case 0: this.setState({extraPic: [image.data].concat(this.state.extraPic.slice(1,3)), isExtraChange: true }); break;
                case 1: this.setState({extraPic: this.state.extraPic.slice(0,1).concat(image.data).concat(this.state.extraPic.slice(2,3)), isExtraChange: true }); break;
                case 2: this.setState({extraPic: this.state.extraPic.slice(0,2).concat(image.data), isExtraChange: true }); break;
            }

            this.verify();
        }).catch((err) => {

        });
    }

    erazeImage(id) {
        this.setState({
            modalVisiable: false,
            curModalID: -1,
        });
        let isNeedChange = false
        // 검증
        switch(id) {
            case 0: isNeedChange = this.state.extraPic[0] == '' ? false : true; break; 
            case 1: isNeedChange = this.state.extraPic[1] == '' ? false : true; break; 
            case 2: isNeedChange = this.state.extraPic[2] == '' ? false : true; break; 
        }
        if(isNeedChange) {
            switch(id) {
                case 0: this.setState({extraPic: [''].concat(this.state.extraPic.slice(1,3)), isExtraChange: true }); break;
                case 1: this.setState({extraPic: this.state.extraPic.slice(0,1).concat('').concat(this.state.extraPic.slice(2,3)), isExtraChange: true }); break;
                case 2: this.setState({extraPic: this.state.extraPic.slice(0,2).concat(''), isExtraChange: true }); break;
            }
            this.verify();
        }
    }

    verify() {
        switch(this.props.cls) {
            case 'gangnamAPT': {
                useAuth.getState().setGangnamAPT(this.state.extraPic == ['','',''] ? '' : this.state.extraPic);
                break;
            }
        }
    }

    GalleryOrCamera = (id) => {
        return(
            <Modal
            animationType='slide'//'fade'
            transparent={true}
            visible={this.modalVisiable}
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
                                    onPress={() => this.openGallery(id)}
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
                                    onPress={() => this.openCamera(id)}
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
                                    onPress={() => this.erazeImage(id)}
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
                            onPress={() => this.setModalVisiable(false)}
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
    
    Pic = (props) => {
        const ShowAvatar = () => {
            return(
                <View style={{
                    alignItems: 'center',                
                }}>
                    <Icon name='plus' size={30} />
                </View>
                
            );
        }

        const id = props.id;
        
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
                    this.setModalVisiable(true, id)
                }}
            >
                { 
                    id == 0 && this.state.extraPic[0] != '' ? this.ShowPic(id) :
                    id == 1 && this.state.extraPic[1] != '' ? this.ShowPic(id) :
                    id == 2 && this.state.extraPic[2] != '' ? this.ShowPic(id) : 
                    <ShowAvatar props={props} /> 
                }
    
                {
                    id == this.state.curModalID ? this.GalleryOrCamera(id) : <></>
                }
    
            </Pressable>
        );
    }
    
    ShowPic = (id) => {
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
                        (id == 0 ? (this.state.extraPic[0].length <= 100 ? this.state.picURL + this.state.extraPic[0] : 'data:image/jpeg;base64,' + this.state.extraPic[0]) :
                        id == 1 ?  (this.state.extraPic[1].length <= 100 ? this.state.picURL + this.state.extraPic[1] : 'data:image/jpeg;base64,' + this.state.extraPic[1]) :
                        id == 2 ?  (this.state.extraPic[2].length <= 100 ? this.state.picURL + this.state.extraPic[2] : 'data:image/jpeg;base64,' + this.state.extraPic[2]) : ' ')
                    }}
                />
                {
                    id == 0 && this.state.returnedPic.includes('0') ? this.ImgReturn() :
                    id == 1 && this.state.returnedPic.includes('1') ? this.ImgReturn() :
                    id == 2 && this.state.returnedPic.includes('2') ? this.ImgReturn() : <></>
                } 
            </View>
            
        );
    }

    ImgReturn = () => {
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
}

export default AuthImagePicker;
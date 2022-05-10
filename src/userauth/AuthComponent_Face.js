import React from 'react';
import { customAxios } from '../customAxios';
import AuthPresenter_Face from './AuthPresenter_Face';
import ImagePicker from 'react-native-image-crop-picker';
import { useAuth } from '../../AppContext';

class AuthComponent_Face extends React.Component {

    constructor(props) {
        super(props);
        console.log('@AuthComponent_Face');

        this.state = {
            curModalID: -1,
            modalVisiable: false,
            setModalVisiable: this.setModalVisiable.bind(this),
            openGallery: this.openGallery.bind(this),
            openCamera: this.openCamera.bind(this),
            erazeImage: this.erazeImage.bind(this),

            mainPic: [''],
            requirePic: ['',''],
            extraPic: ['','',''],
            picURL: 'http://192.168.1.243:4001/media/image/?imageName=',

            isMainChange : false,
            isRequireChange: false,
            isExtraChange: false,

            verify: this.verify.bind(this),
        };

        
    }

    componentDidMount() {
        this.setState({
            mainPic: useAuth.getState().mainPic == '' ? [''] : useAuth.getState().mainPic,
            requirePic: useAuth.getState().requirePic == '' ? ['',''] : useAuth.getState().requirePic,
            extraPic: useAuth.getState().extraPic == '' ? ['','',''] : useAuth.getState().extraPic,
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
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
            width: 480,
            height: 480,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 1,
        }).then(image => {
            switch(id) {
                case 0: this.setState({mainPic: [image.data], isMainChange: true }); break;
                case 1: this.setState({requirePic: [image.data].concat(this.state.requirePic.slice(1,2)), isRequireChange: true }); break;
                case 2: this.setState({requirePic: this.state.requirePic.slice(0,1).concat(image.data), isRequireChange: true }); break;
                case 3: this.setState({extraPic: [image.data].concat(this.state.extraPic.slice(1,3)), isExtraChange: true }); break;
                case 4: this.setState({extraPic: this.state.extraPic.slice(0,1).concat(image.data).concat(this.state.extraPic.slice(2,3)), isExtraChange: true }); break;
                case 5: this.setState({extraPic: this.state.extraPic.slice(0,2).concat(image.data), isExtraChange: true }); break;
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
            width: 480,
            height: 480,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 1,
        }).then(image => {
            switch(id) {
                case 0: this.setState({mainPic: [image.data], isMainChange: true }); break;
                case 1: this.setState({requirePic: [image.data].concat(this.state.requirePic.slice(1,2)), isRequireChange: true }); break;
                case 2: this.setState({requirePic: this.state.requirePic.slice(0,1).concat(image.data), isRequireChange: true }); break;
                case 3: this.setState({extraPic: [image.data].concat(this.state.extraPic.slice(1,3)), isExtraChange: true }); break;
                case 4: this.setState({extraPic: this.state.extraPic.slice(0,1).concat(image.data).concat(this.state.extraPic.slice(2,3)), isExtraChange: true }); break;
                case 5: this.setState({extraPic: this.state.extraPic.slice(0,2).concat(image.data), isExtraChange: true }); break;
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
            case 0: isNeedChange = this.state.mainPic[0] == '' ? false : true; break; 
            case 1: isNeedChange = this.state.requirePic[0] == '' ? false : true; break; 
            case 2: isNeedChange = this.state.requirePic[1] == '' ? false : true; break; 
            case 3: isNeedChange = this.state.extraPic[0] == '' ? false : true; break; 
            case 4: isNeedChange = this.state.extraPic[1] == '' ? false : true; break; 
            case 5: isNeedChange = this.state.extraPic[2] == '' ? false : true; break; 
        }
        if(isNeedChange) {
            switch(id) {
                case 0: this.setState({mainPic: ['-1'], isMainChange: true }); break;
                case 1: this.setState({requirePic: ['-1'].concat(this.state.requirePic.slice(1,2)), isRequireChange: true }); break;
                case 2: this.setState({requirePic: this.state.requirePic.slice(0,1).concat('-1'), isRequireChange: true }); break;
                case 3: this.setState({extraPic: ['-1'].concat(this.state.extraPic.slice(1,3)), isExtraChange: true }); break;
                case 4: this.setState({extraPic: this.state.extraPic.slice(0,1).concat('-1').concat(this.state.extraPic.slice(2,3)), isExtraChange: true }); break;
                case 5: this.setState({extraPic: this.state.extraPic.slice(0,2).concat('-1'), isExtraChange: true }); break;
            }
            this.verify();
        }
    }

    verify() {
        // 변경된 사진이 아예 없으면 return
        if(!this.state.isMainChange && !this.state.isRequireChange && !this.state.isExtraChange) return;

        if( this.state.mainPic[0] != '' ||
            this.state.requirePic[0] != '' ||
            this.state.requirePic[1] != '' ) {
                if(this.state.isMainChange) useAuth.getState().setMainPic(this.state.mainPic);
                if(this.state.isRequireChange) useAuth.getState().setRequirePic(this.state.requirePic);
                if(this.state.isExtraChange) useAuth.getState().setExtraPic(this.state.extraPic);
                this.setState({
                    isMainChange : false,
                    isRequireChange: false,
                    isExtraChange: false,
                });
            }
    }

    render() {
        return(
            <AuthPresenter_Face
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default AuthComponent_Face;
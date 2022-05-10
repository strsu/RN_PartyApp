import React from 'react';
import {ToastAndroid} from 'react-native';

import BoardWritingPresenter from './BoardWritingPresenter';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import useStore, { useAnony } from '../../AppContext';
import { customAxios } from '../customAxios';

class BoardWritingComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@BoardWritingComponent');

        this.state = {
            title: "",
            category: "",
            content: "",
            img: "",
            imgWidth: 0,
            imgHeight: 0,
            error: null,
            //filter: this.props.route.params.filter.slice(2).map(param => {return param.name}),
            filter: useAnony.getState().Filter.slice(2).map(param => {return param.name}),
            userSEX: useStore.getState().sex,
            getImage: this.getImage.bind(this),
            removeImage: this.removeImage.bind(this),
            setCategory: this.setCategory.bind(this),
            getCategory: this.getCategory.bind(this),
            setTitle: this.setTitle.bind(this),
            setContent: this.setContent.bind(this),
            postWriting: this.postWriting.bind(this),

            modalVisiable: false,
            setModalVisiable: this.setModalVisiable.bind(this),
            openGallery: this.openGallery.bind(this),
            openCamera: this.openCamera.bind(this),
        };


        // class component에서는 이렇게 해야 한다.
        //this.myRef = React.createRef();
        //this.BoardCard = this.BoardCard.bind(this);
        //this.BigCommentCard = this.BigCommentCard.bind(this);
        
    }

    componentDidMount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "none" },
        });

        // 글 수정시
        if(this.props.route.params.params == 'update') {
            const item = this.props.route.params.item;
            this.setState({
                content: item.content,
                category: item.type,
                title: item.title,
                img: item.images,
            });
        }
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "flex" },
        });
    }

    getImage() {
        return this.state.img;
    }

    removeImage() {
        this.setState({
            img: '',
        });
    }

    getCategory() {
        return this.state.category;
    }

    setCategory(param) {
        this.setState({
            category: param,
        })
    }

    setTitle(param) {
        this.setState({
            title: param,
        })
    }

    setContent(param) {
        this.setState({
            content: param,
        })
    }

    postWriting() {
        let obj = {
            sex:      this.state.userSEX,
            img:      this.state.img,
            title:    this.state.title,
            content:  this.state.content,
            category: this.state.category,
            type:     this.props.route.params.params,
            //uid:      this.props.route.params.item.uid
        }

        // 글 수정시
        if(this.props.route.params.params == 'update') {
            // 내용이 안 바뀌면 업데이트 취소
            const item = this.props.route.params.item;
            if(item.content == this.state.content  &&
               item.title   == this.state.title    &&
               item.type    == this.state.category &&
               item.images  == this.state.img) {
                return ToastAndroid.show('변경된 항목이 없습니다.', ToastAndroid.SHORT);
            } else {
                customAxios.put('/Anony/board/', obj)
                .then((res) => {
                    // 성공시 뒤로 나가기
                    this.props.route.params.item.content = this.state.content;
                    this.props.route.params.item.title = this.state.title;
                    this.props.route.params.item.type = this.state.category;
                    this.props.navigation.pop();
                }).catch((error)=>{
                    this.setState({
                        error: error,
                    })
                })
            }
        } else {
            let msg = "";
            if(obj.title == "") msg += "제목";
            if(obj.category == "") {
                if(msg != "") msg += ", ";
                msg += "태그";
            }
            if(obj.content == "") {
                if(msg != "") msg += ", ";
                msg += "본문"
            }
            if(msg != "") msg += "을 채워넣어 주세요.";
            if(msg != "") return ToastAndroid.show(msg, ToastAndroid.SHORT);
            
            customAxios.post('/Anony/board/', obj)
            .then((res) => {
                this.setState({
                    error: null,
                })
                // 성공시 뒤로 나가기
                this.props.navigation.pop();
            }).catch((error)=>{
                this.setState({
                    error: error,
                })
            })
        }
        
    }

    setModalVisiable(state) {
        this.setState({
            modalVisiable: state,
        });
    }

    openGallery() {
        ImagePicker.openPicker({
            width: 400,
            height: 300,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 0.8,
        }).then(image => {
            this.setState({
                img: image.data,
                modalVisiable: false,
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    openCamera() {
        ImagePicker.openCamera({
            width: 400,
            height: 300,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 0.8,
        }).then(image => {
            this.setState({
                img: image.data,
                modalVisiable: false,
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <BoardWritingPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default BoardWritingComponent;
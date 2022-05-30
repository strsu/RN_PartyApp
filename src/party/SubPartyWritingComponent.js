import React from 'react';
import {ToastAndroid} from 'react-native';
import { customAxios } from '../customAxios';

import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import useStore, {useUserParty} from '../../AppContext';
import { getCurDate } from '../../Screen/util/getCurTime';

import SubPartyWritingPresenter from './SubPartyWritingPresenter';


class SubPartyWritingComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@SubPartyWritingComponent');

        let uid = -1;
        if(this.props.route.params != undefined) {
            uid = String(this.props.route.params.uid);
        }

        this.state = {
            title: this.props.route.params == undefined ? '' : useUserParty.getState().filterData[uid].title,
            category: this.props.route.params == undefined ? [] : useUserParty.getState().filterData[uid].tags,
            content: this.props.route.params == undefined ? '' : useUserParty.getState().filterData[uid].content,
            img: this.props.route.params == undefined ? '' : useUserParty.getState().filterData[uid].images,
            state: 0,   // 파티 유형 - 하트 사용 유무
            imgWidth: 0,
            imgHeight: 0,
            error: null,
            filter: Object.values(useUserParty.getState().filterData),
            userUUID: useStore.getState().uuid,
            userSEX: useStore.getState().sex,

            calendarModalVisiable: false,
            markedDates: {},
            setCalendarModal: this.setCalendarModal.bind(this),
            setPeriod: this.setPeriod.bind(this),
            minDate: getCurDate(),

            partyCheck: true,
            setCheck: this.setCheck.bind(this),

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
            headerShown: false,
        });
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            headerShown: true,
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
        // 선택한 태그면 삭제
        let category = this.state.category;
        if(category.includes(param)) {
            
            let arr = [];
            category.map(data => {
                if(data != param) {
                    arr.push(data);
                }
            });

            this.setState({
                category: arr,
            })
        } else {
            // 태그는 3개까지 가능
            if(category.length > 2) return;

            this.setState({
                category: category.concat(param),
            })
        }
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

    setCheck() {
        this.setState({
            partyCheck: !this.state.partyCheck,
        });
    }

    setPeriod(day) {
        let json = {};
        json[day.dateString] = {startingDay: true, endingDay: true, color: '#50cebb', textColor: 'white'}
        this.setState({
            markedDates: json
        });
        setTimeout(() => {this.setCalendarModal()}, 500);
    }

    setCalendarModal() {
        this.setState({
            calendarModalVisiable: !this.state.calendarModalVisiable
        })
    }

    postWriting() {
        let obj = {
            sex: this.state.userSEX,
            img: this.state.img,
            title: this.state.title,
            content: this.state.content,
            category: this.state.category,
            date: Object.keys(this.state.markedDates)[0],
            state: this.state.partyCheck ? '0' : '1'
        }

        let msg = "(";
        if(obj.title == "") msg += "제목";
        if(obj.category.length == "") {
            if(msg != "") msg += ", ";
            msg += "태그";
        }
        if(obj.content == "") {
            if(msg != "") msg += ", ";
            msg += "본문"
        }

        if(obj.date == undefined) {
            if(msg != "") msg += ", ";
            msg += "파티 개최일"
        }

        if(msg != "(") msg += ") 을 채워넣어 주세요.";
        if(msg != "(") return ToastAndroid.show(msg, ToastAndroid.SHORT);

        
        
        customAxios.post('/SubParty/board/', obj)
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

    setModalVisiable(state) {
        this.setState({
            modalVisiable: state,
        });
    }

    openGallery() {
        ImagePicker.openPicker({
            width: 480,
            height: 480,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 0.9,
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
            width: 480,
            height: 480,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 0.9,
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
            <SubPartyWritingPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default SubPartyWritingComponent;
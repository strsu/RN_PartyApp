import React from 'react';
import {
    Animated,
    Platform,
  } from 'react-native';
import useStore from '../../AppContext';
import ImagePicker from 'react-native-image-crop-picker';
import { customAxios } from '../customAxios';

import MainPartyDetailPresenter from './MainPartyDetailPresenter';

class MainPartyDetailComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@MainPartyDetailComponent');

        this.state = {
            data: [this.props.route.params.content],
            showType: '상세정보',

            img: '',
            text: '',
            textHeight: 40,
            setContent: this.setContent.bind(this),
            
            partyInfo: this.props.route.params,
            partyContent: [this.props.route.params.content],
            partyReview: [],
            partyQnA: [],

            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false,

            setShowType: this.setShowType.bind(this),
            openGallery: this.openGallery.bind(this),
        };

    }

    componentDidMount() {
        /*this.props.navigation.getParent().getParent().setOptions({
            tabBarStyle: { display: "none" },
        });

        this.props.navigation.getParent().setOptions({
            swipeEnabled: false,
        })*/
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        /*this.props.navigation.getParent().getParent().setOptions({
            tabBarStyle: { display: "flex" },
        });

        this.props.navigation.getParent().setOptions({
            swipeEnabled: true,
            tabStyle: {display: 'none'},
        })*/
    }

    render() {
        return(
            <MainPartyDetailPresenter
                props={this.props}
                state={this.state}
            />
        );
    }

    setContent(param) {
        this.setState({
            text: param.text,
            textHeight: 40 * param.text.split('\n').length > 160 ? 160 : 20 + 20 * param.text.split('\n').length,
        });
    }

    setShowType(type) {
        if(type=='상세정보') {
            this.setState({
                showType: type,
                data: this.state.partyContent,
            });
        } else if(type=='리뷰') {
            console.log('sdf');
            this.getReview();
            this.setState({
                showType: type,
                data: this.state.partyReview,
                textHeight: 40,
            });
        } else {
            console.log('s21212df');
            this.getQnA();
            this.setState({
                showType: type,
                data: this.state.partyQnA,
                textHeight: 40,
            });
        }
    }

    getReview() {

    }

    getQnA() {

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
            })
        }).catch((err) => {
            console.log(err);
        });
    }
}

export default MainPartyDetailComponent;
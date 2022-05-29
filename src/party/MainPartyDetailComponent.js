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
            partyQnA: [0],

            qnaText: '',
            qnaPost: this.qnaPost.bind(this),
            setQNAText: this.setQNAText.bind(this),
            toggleCheckBox: false,
            setToggleCheckBox: this.setToggleCheckBox.bind(this),

            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false,

            setShowType: this.setShowType.bind(this),
            openGallery: this.openGallery.bind(this),
            reviewPost: this.reviewPost.bind(this),
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
            });
        } else if(type=='리뷰') {
            this.getReview();
            this.setState({
                showType: type,
                textHeight: 40,
            });
        } else {
            this.getQnA();
            this.setState({
                showType: type,
                textHeight: 40,
            });
        }
    }

    reviewPost() {
        
    }

    getReview() {

        customAxios.get('/MainParty/review/', {
            'params': {
                uid: this.props.route.params.uid,
            }
        }).then((res) => {
            this.setState({
                partyReview: [res.data],
            });
        }).catch((err) => {

        })
    }

    setQNAText(text) {
        this.setState({
            qnaText: text,
        });
    }

    qnaPost() {
        if(this.state.qnaText.length > 0) {
            customAxios.post('/MainParty/qna/', {
                uid: this.props.route.params.uid,
                content: this.state.qnaText,
                secret: this.state.toggleCheckBox ? 1 : 0,
            }).then((res) => {
                if(this.state.partyQnA[0] == 0) {
                    // 데이터가 없는 경우
                    this.setState({
                        partyQnA: [{
                            content: this.state.qnaText,
                            answer: null
                        }]
                    })
                } else {
                    this.setState({
                        partyQnA: this.state.partyQnA.concat({
                            content: this.state.qnaText,
                            answer: null
                        }),
                    })
                }
            }).catch((err) => {

            })
        }
    }

    getQnA() {
        customAxios.get('/MainParty/qna/', {
            'params': {
                uid: this.props.route.params.uid,
            }
        }).then((res) => {
            this.setState({
                partyQnA: [res.data],
            });
        }).catch((err) => {

        })
    }

    setToggleCheckBox(param) {
        this.setState({
            toggleCheckBox: param,
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
            })
        }).catch((err) => {
            console.log(err);
        });
    }
}

export default MainPartyDetailComponent;
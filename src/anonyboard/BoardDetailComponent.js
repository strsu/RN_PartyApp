import React from 'react';
import { BackHandler, Keyboard } from 'react-native';
import { customAxios } from '../customAxios';

import BoardDetailPresenter from './BoardDetailPresenter';
import useStore, { useAnony } from '../../AppContext';

class BoardDetailComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@BoardDetailComponent');

        this.state = {
            comment: '',
            commentData: [],
            item: this.props.route.params.paramKey,
            data: null,
            selectedComment: -1,
            userUUID: useStore.getState().uuid,
            userSEX: useStore.getState().sex,
            needReload: false,
            putComment: this.putComment.bind(this),
            putCommentError: null,
            setComment: this.setComment.bind(this),
            setSelectedComment: this.setSelectedComment.bind(this),
            getSelectedComment: this.getSelectedComment.bind(this),
            pushHeart: this.pushHeart.bind(this),

            kebabModalVisiable: false,
            setKebabModal: this.setKebabModal.bind(this),

            myRef: React.createRef(),
            myRefY: 0,
            inputRef: React.createRef(),
        };

        // class component에서는 이렇게 해야 한다.
        //this.myRef = React.createRef();

    }

    componentDidMount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "none" },
        });

        customAxios.get('/Anony/comment/', {
            'params': { uid: this.state.item["uid"] }
        }).then((res) => {
            this.setState({
                commentData: res.data
            })
        }).catch((error) => {
            console.log('ERROR, @BoardDetailComponent -', error);
            this.setState({
                error: error
            })
        });

        if (!this.state.item.isMine) {
            customAxios.put('/Anony/board/', {
                uid: this.state.item["uid"],
                type: 'read'
            }).then((res) => {
                this.state.item.read += 1;
            }).catch((error) => {
                console.log('ERROR, @BoardDetailComponent -', error);
            });
        }


        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentDidUpdate() {

        if (this.state.needReload) {
            customAxios.get('/Anony/comment/', {
                'params': { uid: this.state.item["uid"] }
            }).then((res) => {
                this.setState({
                    commentData: res.data,
                    needReload: false
                })
                if (this.state.myRefY != -1) {
                    // 데이터 쓰이고 나서 가야되나 봄
                    setTimeout(() => { this.state.myRef.current.scrollToOffset({ offset: this.state.myRefY }) }, 50);
                }

            }).catch((error) => {
                console.log('ERROR, @BoardDetailComponent -', error);
                this.setState({
                    error: error
                })
            });
        }
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "flex" },
        });

        this.backHandler.remove();
    }


    render() {
        return (
            <BoardDetailPresenter
                props={this.props}
                state={this.state}
            />
        );
    }

    getSelectedComment() {
        return this.state.selectedComment;
    }

    setSelectedComment(param) {
        this.setState({
            selectedComment: this.state.selectedComment != -1 ? -1 : param
        })
    }

    backAction = () => {
        if (this.state.selectedComment != -1) {
            this.setState({
                selectedComment: -1,
            })
            return true;
        }
        //return true;
    };

    setComment(data) {
        this.setState({
            comment: data,
        })
    }

    putComment() {
        //if(this.state.comment == '') return;
        if (useAnony.getState().commentText == '') return;

        // 키보드 내리기
        Keyboard.dismiss();

        let obj = {
            uid: this.state.item.uid,       // 게시글 id
            //content: this.state.comment,
            content: useAnony.getState().commentText,
            sex: this.state.userSEX,
            nickname: this.state.item.isMine ? this.state.item.writer : '',
            isSub: this.state.selectedComment == -1 ? -1 : this.state.selectedComment,
        }
        let isBigComment = this.state.selectedComment == -1 ? -1 : this.state.selectedComment;

        customAxios.post('/Anony/comment/', obj)
            .then((res) => {
                useAnony.getState().setCommentText('');
                this.setState({
                    putCommentError: null,
                    selectedComment: -1,
                    //comment: "",
                    needReload: true,
                    myRefY: isBigComment == -1 ? parseInt(Object.values(this.state.myRef)[0]._listRef._scrollMetrics.contentLength) + 100 : -1,
                });
                // 게시물의 아이템을 가져온거라,
                // 이렇게 하면 외부의 게시글 값도 갱신된다.
                this.state.item.replyCnt += 1;

                // 댓글영역 글지 지우기, zustand 쓰니까 value를 못 쓴다..ㅠㅠ
                this.state.inputRef.current.clear();

            }).catch((error) => {
                this.setState({
                    putCommentError: error,
                });
            })

    }

    pushHeart(params, type) {
        if (params.isMine == 1) return;

        if (type == 'content') {
            customAxios.put('/Anony/board/', {
                uid: this.state.item["uid"],
                type: 'like',
                isLike: params.isLike,
            }).then((res) => {
                this.state.item.isLike = this.state.item.isLike ? false : true;
                if (this.state.item.isLike) {
                    this.state.item.like += 1;
                } else {
                    this.state.item.like -= 1;
                }

                this.setState({
                    item: this.state.item,
                });

            }).catch((error) => {
                console.log('ERROR, @BoardDetailComponent -', error);
            });
        } else {
            customAxios.put('/Anony/comment/', {
                uid: params.index,
                refid: params.refid,
                type: 'like',
                isLike: params.isLike,
            }).then((res) => {
                    for (let i = 0; i < this.state.commentData.length; i++) {
                        // 댓글에서 isLike 값을 갱신해준다.
                        let _like = this.state.commentData[i].like;
                        if (this.state.commentData[i] == params) {
                            this.state.commentData[i].like = params.isLike ? _like - 1 : _like + 1;
                            this.state.commentData[i].isLike = params.isLike ? false : true;
                            break;
                        } else if(this.state.commentData[i].bigComment.length > 0) {  // 대댓글인 경우
                            for (let j = 0; j < this.state.commentData[i].bigComment.length; j++) {
                                _like = this.state.commentData[i].bigComment[j].like;
                                if (this.state.commentData[i].bigComment[j] == params) {
                                    this.state.commentData[i].bigComment[j].like = params.isLike ? _like - 1 : _like + 1;
                                    this.state.commentData[i].bigComment[j].isLike = params.isLike ? false : true;
                                    break;
                                }
                            }
                        }
                    }

                    this.setState({
                        commentData: this.state.commentData,
                    });
                })
                .catch((error) => {
                    console.log('ERROR, pushHeart', error);
                })
        }
    }

    setKebabModal(param) {
        this.setState({
            kebabModalVisiable: param,
        });
    }

}

export default BoardDetailComponent;
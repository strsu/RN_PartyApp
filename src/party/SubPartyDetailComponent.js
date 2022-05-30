import React from 'react';
import { customAxios } from '../customAxios';

import useStore, { useUserParty } from '../../AppContext';
import SubPartyDetailPresenter from './SubPartyDetailPresenter';
import { ThemeProvider } from '@react-navigation/native';

class SubPartyDetailComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@SubPartyDetailComponent');

        this.state = {
            recommandData: [],
            partyData: [],
            userUUID: useStore.getState().uuid,
            userSEX: useStore.getState().sex,
            partyApply: this.partyApply.bind(this),
            getPartyApply: this.getPartyApply.bind(this),
            partyApplyModal: false,
            isApplySuccess: false,
            whichUID: -1,
            getWhichUID: this.getWhichUID.bind(this),

            kebabModalVisiable: false,
            setKebabModal: this.setKebabModal.bind(this),

            headerData: undefined,
            isLike: false,
            isDibs: false,
            isApply: false,

            partyAddonData: [],
            addonBtn: this.addonBtn.bind(this),
            addonFun: this.addonFun.bind(this),


            // 유저 프로파일 관련
            selectedUser: '',
            userModalVisiable: false,
            setUserModal: this.setUserModal.bind(this),
            userData: {},
            getUserDetail: this.getUserDetail.bind(this),
            getPhone: this.getPhone.bind(this),
            imageData: [],

            writerProfileModalVisiable: false,
            writerModal: this.writerModal.bind(this),
        };

    }

    componentDidMount() {

        this.props.navigation.getParent().setOptions({
            headerShown: false,
        });

        // this.props.route.params.params.tags.replace(/ /g, '_')
        // 위처럼 하면 replaceAll가 동일

        let data = undefined;
        let uid = -1;

        if (this.props.route.params.uid == undefined) {
            // 내 서랍에서 들어온 경우
            uid = this.props.route.params.item.uid;
            if(useUserParty.getState().partyData[`${uid}`]!= undefined) {
                // 이미 가져온 데이터면 원본 데이터를 가져온다.
                data = useUserParty.getState().partyData[`${uid}`];    
            } else {
                data = this.props.route.params.item;
            }
        } else {
            data = useUserParty.getState().partyData[`${this.props.route.params.uid}`];
            uid = this.props.route.params.uid;
        }

        if (data == undefined) {
            return;
        }

        let tags = [];
        let tagString = ''
        data.tags.map(data => {
            tags.push(data.replace(/\//g, '-').replace('?', ''));
            tagString += data.replace(/\//g, '-') + ',';
        });

        this.setState({
            headerData: data,
            isLike: data.isLike,
            isDibs: data.isDibs,
            isApply: data.isApply,
        });

        // 비슷한 태그를 지닌 다른 글들을 보여줌
        if (this.props.route.params.uid != undefined && !data.isMine) {
            customAxios.get(`SubParty/board/`, {
                'params': {
                    page: uid,
                    category: JSON.stringify(tags),
                    type: 3,
                    mSex: useUserParty.getState().mSex,
                    wSex: useUserParty.getState().wSex,
                    startDay: '',
                    endDay: '',
                }
            }).then((res) => {
                this.setState({
                    partyData: Object.values(res.data).reverse(),
                });
                Object.values(res.data).map(data => {
                    this.state.partyAddonData.push({ id: data.uid, isLike: data.isLike, isDibs: data.isDibs });
                });
            }).catch((err) => {
                console.log("SubPartyComponent <partyData> ", err);
            })
        } else if (data.isMine) {
            // 내 글이면 파티에 신청한 사람을 보여줌
            customAxios.get('SubParty/apply/', {
                'params': {
                    uid: uid,
                    type: 'user'
                }
            }).then((res) => {
                this.setState({
                    recommandData: res.data,
                });
                if (this.state.recommandData.length == 1) {
                    this.setState({
                        recommandData: this.state.recommandData.concat([[], []])
                    })
                } else if (this.state.recommandData.length == 2) {
                    this.setState({
                        recommandData: this.state.recommandData.concat([])
                    })
                }
            }).catch((err) => {
                console.log("SubPartyComponent <recommandData> ", err);
            })
        }

        if (data.isApply && data.state == 0) {
            // 파티를 신청했고, 파티 종류가 주최자 프로필 확인 가능 파티라면
            customAxios.get('/SubParty/usersimpledetail/', {
                'params': {
                    uid: uid
                }
            }).then((res) => {
                let imgData = [res.data.mainpic];
                res.data.requirepic.map(img => img != '' ? imgData.push(img) : '');
                res.data.extrapic.map(img => img != '' ? imgData.push(img) : '');
                this.setState({
                    imageData: imgData,
                });
            }).catch((err) => {

            })
        }

    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            headerShown: true,
        });
    }


    render() {

        return (
            <SubPartyDetailPresenter
                props={this.props}
                state={this.state}
            />
        );
    }

    addonBtn(type, uid, idx) {

        // 들어온 게시물
        if (idx == -1) {

            let data = undefined;

            if (this.props.route.params.uid == undefined) {
                // 내 서랍에서 들어온 경우

                // 가져온 서브파티정보에 해당 게시물이 있는지 체크
                data = useUserParty.getState().partyData[uid];
                if (data == undefined) {
                    // 가져온 정보에 없으면 넘어온 파라미터를 연결
                    // 외부 데이터까지 신경 쓸 필요가 없다
                    data = this.props.route.params.item;
                }

            } else {
                data = useUserParty.getState().partyData[`${this.props.route.params.uid}`];
            }
            if (data == undefined) {
                return;
            }

            let func = undefined;
            if (type == 'like' && data.isLike) func = customAxios.delete;
            else if (type == 'like' && !data.isLike) func = customAxios.post;
            else if (type == 'dibs' && data.isDibs) func = customAxios.delete;
            else if (type == 'dibs' && !data.isDibs) func = customAxios.post;

            func(`/SubParty/addon/`, {
                data: {
                    type: type,
                    uid: uid
                }
            }).then((res) => {
                data.isLike = type == 'like' ? (!data.isLike) : data.isLike;
                data.isDibs = type == 'dibs' ? (!data.isDibs) : data.isDibs;
                
                // 이건 보이기용
                this.setState({
                    isLike: data.isLike,
                    isDibs: data.isDibs,
                });

                if (this.props.route.params.uid == undefined) {
                    // 내 서랍에서 들어왔는데
                    if(useUserParty.getState().partyData[uid] != undefined) {
                        // 이미 가져온 게시물인 경우
                        this.props.route.params.item = data;
                    }
                }

            }).catch((err) => {
                console.log('SubPartyComponent <likeBtn> ', err)
            })
        } else {
            // 비슷한 태그 게시물

            let func = undefined;
            if (type == 'like' && this.state.partyAddonData[idx].isLike) func = customAxios.delete;
            else if (type == 'like' && !this.state.partyAddonData[idx].isLike) func = customAxios.post;
            else if (type == 'dibs' && this.state.partyAddonData[idx].isDibs) func = customAxios.delete;
            else if (type == 'dibs' && !this.state.partyAddonData[idx].isDibs) func = customAxios.post;

            func(`/SubParty/addon/`, {
                data: {
                    type: type,
                    uid: uid
                }
            }).then((res) => {
                type == 'like' ? this.state.partyAddonData[idx].isLike = !this.state.partyAddonData[idx].isLike : this.state.partyAddonData[idx].isDibs = !this.state.partyAddonData[idx].isDibs
                this.setState({
                    partyAddonData: this.state.partyAddonData,
                });

                // 비슷한 태그가 메인 페이지에서 로딩한 게시물이라면
                // 해당 게시물 내용도 바꾸어 줘야 함
                if (useUserParty.getState().partyData[uid] != undefined) {
                    if (type == 'like') {
                        useUserParty.getState().partyData[uid].isLike = !useUserParty.getState().partyData[uid].isLike;
                    } else {
                        useUserParty.getState().partyData[uid].isDibs = !useUserParty.getState().partyData[uid].isDibs;
                    }
                }
            })
                .catch((err) => {
                    console.log('SubPartyComponent <likeBtn> ', err)
                })
        }

    }

    addonFun() {

    }

    partyApply(boolVal, uid_, idx_) {
        this.setState({
            partyApplyModal: !this.state.partyApplyModal,
            whichUID: uid_,
        });
        let idx = idx_;

        if (boolVal) {
            customAxios.post('SubParty/apply/', {
                uid: uid_,
            })
                .then((res) => {
                    if (idx == -1) { // 들어온 글
                        this.setState({
                            isApply: true,
                        });
                        this.state.headerData.isApply = true;
                        useUserParty.getState().partyData[uid_].isApply = true;

                        if(this.state.headerData.state == 0) {
                            customAxios.get('/SubParty/usersimpledetail/', {
                                'params': {
                                    uid: uid_
                                }
                            }).then((res) => {
                                let imgData = [res.data.mainpic];
                                res.data.requirepic.map(img => img != '' ? imgData.push(img) : '');
                                res.data.extrapic.map(img => img != '' ? imgData.push(img) : '');
                                this.setState({
                                    imageData: imgData,
                                });
                            }).catch((err) => {
                
                            })
                        }

                    } else { // 비슷한 태그
                        // 비슷한 태그가 메인 페이지에서 로딩한 게시물이라면
                        // 해당 게시물 내용도 바꾸어 줘야 함
                        this.state.partyData[idx].isApply = true;
                        if (useUserParty.getState().partyData[uid_] != undefined) {
                            useUserParty.getState().partyData[uid_].isApply = true;
                        }
                        this.setState({
                            isApplySuccess: true,
                            whichUID: -1,
                        });
                    }
                }).catch((err) => {
                    this.setState({
                        isApplySuccess: false,
                        whichUID: -1,
                    });
                    console.log("SubPartyComponent <partyApply> ", err);
                })
        } else {
            this.setState({
                isApplySuccess: false,
            });
        }
    }

    getPartyApply() {
        return this.state.partyApplyModal;
    }

    getWhichUID() {
        return this.state.whichUID;
    }

    setKebabModal(param) {
        this.setState({
            kebabModalVisiable: param,
        });
    }

    getUserDetail(user) {
        customAxios.get('/SubParty/userdetail/', {
            'params': {
                useruuid: user.user,
            }
        }).then((res) => {
            let imgData = [user.image];
            res.data.requirepic.map(img => img != '' ? imgData.push(img) : '');
            res.data.extrapic.map(img => img != '' ? imgData.push(img) : '');
            //console.log(user);
            this.setState({
                userData: res.data,
                imageData: imgData,
            });
        }).catch((err) => {
            console.log('err', err);
        })
    }

    getPhone() {
        let uid = -1;

        if (this.props.route.params.uid == undefined) {
            // 내 서랍에서 들어온 경우
            uid = this.props.route.params.item.uid;
        } else {
            uid = this.props.route.params.uid;
        }
        customAxios.put('/SubParty/apply/', {
            useruuid: this.state.selectedUser.user,
            uid: uid,
        }).then((res) => {
            console.log(res.data, res.status);
            this.state.recommandData.map(elem => {
                if (elem == this.state.selectedUser) {
                    elem.attend = 2;
                    elem.phone = res.data.phone;
                }
            });
            this.state.selectedUser.attend = 2;
            this.state.selectedUser.phone = res.data.phone;
            this.setState({
                recommandData: this.state.recommandData,
                selectedUser: this.state.selectedUser,
            });
        }).catch((err) => {
            console.log('err', err);
        })
    }

    setUserModal(bool, user) {
        this.setState({
            userModalVisiable: bool,
        });

        if (bool && user != true) {
            // 유저 데이터 가져오기
            this.getUserDetail(user);
            this.setState({
                selectedUser: user,
            });
        } else {
            // 수락하기를 누르면
            if (user) {
                let uid = -1;

                if (this.props.route.params.uid == undefined) {
                    // 내 서랍에서 들어온 경우
                    uid = this.props.route.params.item.uid;
                } else {
                    uid = this.props.route.params.uid;
                }
                customAxios.put('/SubParty/apply/', {
                    useruuid: this.state.selectedUser.user,
                    uid: uid,
                }).then((res) => {
                    this.state.recommandData.map(elem => {
                        if (elem == this.state.selectedUser) {
                            elem.attend = 1;
                        }
                    });
                    this.state.selectedUser.attend = 1;
                    this.setState({
                        recommandData: this.state.recommandData,
                        selectedUser: this.state.selectedUser,
                    });
                }).catch((err) => {
                    console.log('err', err);
                })
            } {
                this.setState({
                    selectedUser: {},
                });
            }
        }
    }

    writerModal() {
        this.setState({
            writerProfileModalVisiable: !this.state.writerProfileModalVisiable,
        });
    }

}

export default SubPartyDetailComponent;
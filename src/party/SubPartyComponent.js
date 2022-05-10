import React, {PureComponent} from 'react';
import { customAxios } from '../customAxios';

import useStore, {useUserParty} from '../../AppContext';

import SubPartyPresenter from './SubPartyPresenter';

//class SubPartyComponent extends React.Component {
    class SubPartyComponent extends PureComponent {

    constructor(props) {
        super(props);
        console.log('@SubPartyComponent');

        this.state = {
            userUUID: useStore.getState().uuid,
            userSEX: useStore.getState().sex,
            curFilter: '종합',
            setCurFilter: this.setCurFilter.bind(this),
            getCurFilter: this.getCurFilter.bind(this),

            onEndReachedCalledDuringMomentum: false,
            setMomentum: this.setMomentum.bind(this),

            isLastData: false,
            loadMoreOlderData: this.loadMoreOlderData.bind(this),
            loadMoreNewerData: this.loadMoreNewerData.bind(this),
            refreshing: false,
            setRefreshing: this.setRefreshing.bind(this),
            getRefreshing: this.getRefreshing.bind(this),

            positionY: 0,
            setPositionY: this.setPositionY.bind(this),

            tagIn: this.tagIn.bind(this),
            tagOut: this.tagOut.bind(this),
            
            ref: React.createRef(),
        };

        
    }

    componentDidMount() {
        customAxios.get("/SubParty/category/")
        .then((res) => {
            if(res.status == 200) {
                useUserParty.getState().setFilterData(res.data);
            }
        }).catch((err) => {
            console.log("SubPartyComponent <filter> ", err);
        })

        customAxios.get('/SubParty/board/', {
            'params': {
                category: '종합',
                type: 0,
                page: 0,
            }
        }).then( (res) => {
            //console.log(Object.values(res.data));
            if(res.status == 200) {
                //console.log(Object.keys(res.data).length, Object.values(res.data)[0].uid);
                useUserParty.getState().setPartyData(res.data);
            }
        }).catch( (error) =>{
            console.log('ERROR, @MainPartComponent <board>', error);
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }


    render() {
        return(
            <SubPartyPresenter
                props={this.props}
                state={this.state}
            />
        );
    }

    tagIn() {
        this.props.navigation.setOptions({
            swipeEnabled: false,
        })
    }

    tagOut() {
        this.props.navigation.setOptions({
            swipeEnabled: true,
        })
    }

    setRefreshing(param) {
        this.setState({
            refreshing: param,
        });

        if(param) {
            this.loadMoreNewerData();
        }
    }

    getRefreshing() {
        return this.state.refreshing;
    }

    loadMoreNewerData() {
        if(this.state.positionY > 50) return;
        let uid = 0;
        let state = 0;
        let filter = useUserParty.getState().curFilter;
        if (Object.keys(useUserParty.getState().partyData).length != 0) {
            uid = Object.values(useUserParty.getState().partyData)[Object.keys(useUserParty.getState().partyData).length-1].uid
            state = 1;
        } else {
            return;
        }
        this.state.ref.current.scrollToOffset({
            offset: 10,
            animated: true
        });

        customAxios.get('/SubParty/board/', {
            'params': {
                category: filter,
                type: state,
                page: uid,
            }
        }).then( (res) => {
            if(res.status == 200) {
                useUserParty.getState().setPartyData(Object.assign(useUserParty.getState().partyData, res.data));
                this.state.ref.current.scrollToOffset({
                    offset: 0,
                    animated: true
                });
                this.setState({
                    positionY: 0,
                })
            }
        }).catch( (error) =>{
            console.log('ERROR, @SubPartyComponent <loadMoreNewerData>', error);
        });
    };

    loadMoreOlderData(distanceFromEnd) {
        if( this.state.onEndReachedCalledDuringMomentum || 
            this.state.isLastData || 
            Object.keys(useUserParty.getState().partyData).length == 0) {
                return;
            }

        if(!this.state.onEndReachedCalledDuringMomentum){
            this.setState({
                onEndReachedCalledDuringMomentum: true,
            });
        } else {
            return;
        }

        let uid = Object.values(useUserParty.getState().partyData)[0].uid;
        let state = 2;
        let filter = useUserParty.getState().curFilter;

        customAxios.get('/SubParty/board/', {
            'params': {
                category: filter,
                type: state,
                page: uid,
            }
        }).then( (res) => {
            if(res.status == 200) {
                useUserParty.getState().setPartyData(Object.assign(res.data, useUserParty.getState().partyData));
                
                return this.onRefresh();
                
                /*this.state.ref.current.scrollToOffset({
                    offset: this.state.positionY + 200,
                    animated: true
                });*/
            } else if(res.status == 204) {
                this.setState({
                    isLastData: true,
                });
            }
        }).catch( (error) =>{
            console.log('ERROR, @SubPartyComponent <loadMoreOlderData>', error);
        });
    };

    wait(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    onRefresh() {
        this.wait(2000).then(() => this.setState({
            onEndReachedCalledDuringMomentum: false,
        }));
    };

    setMomentum(bool) {
        this.setState({
            onEndReachedCalledDuringMomentum: bool,
        });
    };

    setCurFilter(params) {
        if (params != useUserParty.getState().curFilter) {
            params = params.replace('?', '');

            customAxios.get(`/SubParty/board/`, {
                'params': {
                    category: params,
                    type: 0,
                    page: 0,
                }
            }, {
                headers: {"Content-Type" : "application/json"},
                //responseType: "JSON",
                maxContentLength: 2000, // http 응답 내용의 max 사이즈
                maxRedirects: 5
            }).then((res) => {
                useUserParty.getState().setPartyData(res.data);
                useUserParty.getState().setCurFilter(params);
                this.setState({
                    curFilter: params,
                });
            }).catch((err) => {
                console.log("SubPartyComponent <partyData> ", err);
            })
        }
    };

    getCurFilter() {
        return useUserParty.getState().curFilter;
    };

    setPositionY(param) {
        this.setState({
            positionY: parseInt(param),
        });
    };
}

export default SubPartyComponent;
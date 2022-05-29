import React, {PureComponent} from 'react';
import { customAxios } from '../customAxios';

import useStore, {useUserParty} from '../../AppContext';

import SubPartyPresenter from './SubPartyPresenter';
import { tapGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler';

//class SubPartyComponent extends React.Component {
    class SubPartyComponent extends PureComponent {

    constructor(props) {
        super(props);
        console.log('@SubPartyComponent');

        this.state = {
            userUUID: useStore.getState().uuid,
            userSEX: useStore.getState().sex,
            curFilter: [],
            setCurFilter: this.setCurFilter.bind(this),
            getCurFilter: this.getCurFilter.bind(this),

            filterModal: false,
            setFilterModal: this.setFilterModal.bind(this),
            doFiltering: this.doFiltering.bind(this),

            mCheck: true,
            wCheck: true,
            setCheck: this.setCheck.bind(this),

            startDayStyle: {startingDay: true, color: '#50cebb', textColor: 'white'},
            middleDayStyle: {color: '#70d7c7', textColor: 'white'},
            endDayStyle: {endingDay: true, color: '#50cebb', textColor: 'white'},

            startDay: '',
            endDay: '',
            startStamp: -1,
            endStamp: -1,
            markedDates: {},
            setPeriod: this.setPeriod.bind(this),

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
                category: JSON.stringify(['종합']),
                type: 0,
                page: 0,
                mSex: useUserParty.getState().mSex,
                wSex: useUserParty.getState().wSex,
                startDay: useUserParty.getState().startDay,
                endDay: useUserParty.getState().endDay,
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
                category: JSON.stringify(filter),
                type: state,
                page: uid,
                mSex: useUserParty.getState().mSex,
                wSex: useUserParty.getState().wSex,
                startDay: useUserParty.getState().startDay,
                endDay: useUserParty.getState().endDay,
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

        customAxios.get('/SubParty/board/', {
            'params': {
                category: JSON.stringify(useUserParty.getState().curFilter),
                type: state,
                page: uid,
                mSex: useUserParty.getState().mSex,
                wSex: useUserParty.getState().wSex,
                startDay: useUserParty.getState().startDay,
                endDay: useUserParty.getState().endDay,
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
        if(this.state.curFilter.includes(params)) {
            let filter = this.state.curFilter.filter(function(data) {
                return data != params;
            });
            if(filter.length == 0) {
                filter = ['종합']
            }
            this.setState({
                curFilter: filter
            });
        } else {
            this.setState({
                curFilter: this.state.curFilter.concat(params),
            })
        }
    };

    getCurFilter() {
        return useUserParty.getState().curFilter;
    };

    doFiltering() {
        customAxios.get(`/SubParty/board/`, {
            'params': {
                category: JSON.stringify(this.state.curFilter),
                type: 0,
                page: 0,
                mSex: this.state.mCheck,
                wSex: this.state.wCheck,
                startDay: this.state.startDay,
                endDay: this.state.endDay,
            }
        }).then((res) => {
            useUserParty.getState().setPartyData(res.data);
            useUserParty.getState().setCurFilter(this.state.curFilter);
            useUserParty.getState().setMSex(this.state.mCheck);
            useUserParty.getState().setWSex(this.state.wCheck);
            useUserParty.getState().setStartDate(this.state.startDay);
            useUserParty.getState().setEndDate(this.state.endDay);
            this.setState({
                filterModal: false,
                isLastData: false,
            });
        }).catch((err) => {
            console.log("SubPartyComponent <partyData> ", err);
        })
    }

    setFilterModal(param) {
        this.setState({
            filterModal: param
        });
    }

    setCheck(sex, state) {
        if(sex == 'm') {
            if(this.state.wCheck == true) {
                this.setState({
                    mCheck: state,
                })
            } else {
                this.setState({
                    mCheck: state,
                    wCheck: !state,
                })
            }
        } else {
            if(this.state.mCheck == true) {
                this.setState({
                    wCheck: state,
                })
            } else {
                this.setState({
                    wCheck: state,
                    mCheck: !state,
                })
            }
        }
    }

    setPeriod(value) {
        if(this.state.startDay == '' || (this.state.endDay != '' && this.state.startStamp > value.timestamp)) {
            let json = {};
            json[value.dateString] = {selected: true, color: '#50cebb', textColor: 'white'}
            this.setState({
                startDay: value.dateString,
                startStamp: value.timestamp,
                markedDates: json
            });
            if(this.state.endDay != '') {
                let result = [];
                let curDate = new Date(value.dateString);
                while(curDate <= new Date(this.state.endDay)) {
                    let year = curDate.getFullYear();
                    let month = String(curDate.getMonth()+1).padStart(2, '0');
                    let day = String(curDate.getDate()).padStart(2, '0');
                    result.push(`${year}-${month}-${day}`);
                    curDate.setDate(curDate.getDate() + 1);
                }
                let json = {}
                for(let i=0; i<result.length; i++) {
                    if(i == 0) {
                        json[result[i]] = this.state.startDayStyle;
                    } else if(i == result.length-1) {
                        json[result[i]] = this.state.endDayStyle;
                    } else {
                        json[result[i]] = this.state.middleDayStyle;
                    }
                }
                this.setState({
                    markedDates: json,
                });
            }
        } else if(this.state.startDay == value.dateString || this.state.endDay == value.dateString) {
            this.setState({
                startDay: '',
                endDay: '',
                markedDates: {},
            });
        } else {
            let startDay = this.state.startDay;
            let endDay = value.dateString;

            if(this.state.startStamp > value.timestamp) {
                this.setState({
                    startStamp: value.timestamp,
                    startDay: value.dateString,
                    endDay: this.state.startDay,
                });
                startDay = value.dateString;
                endDay = this.state.startDay;
            }

            console.log(startDay, endDay);

            let result = [];
            let curDate = new Date(startDay);
            while(curDate <= new Date(endDay)) {
                let year = curDate.getFullYear();
                let month = String(curDate.getMonth()+1).padStart(2, '0');
                let day = String(curDate.getDate()).padStart(2, '0');
                result.push(`${year}-${month}-${day}`);
                curDate.setDate(curDate.getDate() + 1);
            }
            let json = {}
            for(let i=0; i<result.length; i++) {
                if(i == 0) {
                    json[result[i]] = this.state.startDayStyle;
                } else if(i == result.length-1) {
                    json[result[i]] = this.state.endDayStyle;
                } else {
                    json[result[i]] = this.state.middleDayStyle;
                }
            }

            this.setState({
                endDay: value.dateString,
                markedDates: json,
            });
        }
    }

    setPositionY(param) {
        this.setState({
            positionY: parseInt(param),
        });
    };
}

export default SubPartyComponent;
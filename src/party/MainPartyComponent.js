import React from 'react';
import {
    Animated,
}
from 'react-native'

import { customAxios } from '../customAxios';
import useStore from '../../AppContext';
import MainPartyPresenter from './MainPartyPresenter';

class MainPartyComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@MainPartyComponent');

        this.state = {
            filterData: [],
            partyData: [],
            selectedFilter: 0,
            setCurFilter: this.setCurFilter.bind(this),
            getCurFilter: this.getCurFilter.bind(this),
            loadMoreOlderData: this.loadMoreOlderData.bind(this),
            loadMoreNewerData: this.loadMoreNewerData.bind(this),
            refreshing: false,
            setRefreshing: this.setRefreshing.bind(this),
            getRefreshing: this.getRefreshing.bind(this),

            filterReset: this.filterReset.bind(this),

            filterModalVisiable: false,
            scheduleModalVisiable: false,
            setModalVisiable: this.setModalVisiable.bind(this),

            ageAnimation: new Animated.Value(0),
            ageActive: false,
            setAgeActive: this.setAgeActive.bind(this),

            multiSliderValue: [0,100],
            multiSliderOffsetX: 0,
            multiSliderOffsetY: 0,
            setMultiSliderValue: this.setMultiSliderValue.bind(this),
            setMultiSliderOffsetX: this.setMultiSliderOffsetX.bind(this),
            setMultiSliderOffsetY: this.setMultiSliderOffsetY.bind(this),

            startDayStyle: {startingDay: true, color: '#50cebb', textColor: 'white'},
            middleDayStyle: {color: '#70d7c7', textColor: 'white'},
            endDayStyle: {endingDay: true, color: '#50cebb', textColor: 'white'},

            startDay: '',
            endDay: '',
            startStamp: -1,
            endStamp: -1,
            markedDates: {},
            setPeriod: this.setPeriod.bind(this),

            selectedLocation: [],
            locationSelecting: this.locationSelecting.bind(this),
            location: ['서울','부산','대구','대전','광주','세종','충북','충남','전북','전남','경북','경남','제주도'],

            scrollEnabled: true,
            enableScroll: this.enableScroll.bind(this),
            disableScroll: this.disableScroll.bind(this),

        };

        
    }

    componentDidMount() {

        customAxios.get('/MainParty/board/', {
            'params': {
                type: 0,
                page: 0,
                startDay: this.state.startDay,
                endDay: this.state.endDay,
                location: JSON.stringify(this.state.selectedLocation),
                age: JSON.stringify(this.state.multiSliderValue),
            }
        }).then( (res) => {
            this.setState({
                partyData: res.data,
            })
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
            <MainPartyPresenter
                props={this.props}
                state={this.state}
            />
        );
    }

    setModalVisiable(type, bool) {
        if(type == 'filter') {
            this.setState({
                filterModalVisiable: bool
            });
        } else {
            this.setState({
                scheduleModalVisiable: bool
            });
        }
    }

    filterReset() {
        this.setState({
            startDay: '',
            endDay: '',
            markedDates: {},
            selectedLocation: [],
            multiSliderValue: [0,100],
            filterModalVisiable: false,
        });
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });
    setMultiSliderValue = (value) => this.setState({multiSliderValue: value});
    setMultiSliderOffsetX = (value) => console.log(value); //this.setState({multiSliderOffsetX: value});
    setMultiSliderOffsetY = (value) => this.setState({multiSliderOffsetY: value});

    setAgeActive = () => this.setState({ageActive: this.state.ageActive ? false : true});

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

    locationSelecting(city) {
        if(this.state.selectedLocation.includes(city)) {
            this.setState({
                selectedLocation: this.state.selectedLocation.filter(function(data) {
                    return data != city;
                }),
            });
        } else {
            this.setState({
                selectedLocation: this.state.selectedLocation.concat(city),
            });
        }
    }

    setCurFilter(params) {
        if( this.state.startDay == '' &&
            this.state.endDay == '' &&
            this.state.selectedLocation == [] &&
            this.state.multiSliderValue ==  [0,100]
        ) return;
        console.log(this.state.selectedLocation);
        customAxios.get(`/MainParty/board/`, {
            'params': {
                startDay: this.state.startDay,
                endDay: this.state.endDay,
                location: this.state.selectedLocation,
                age: this.state.multiSliderValue,
            }
        })
        .then((res) => {
            this.setState({
                partyData: res.data,
                selectedFilter: params,
            });
        }).catch((err) => {
            console.log("MainPartComponent <board> ", err);
        });
    }

    getCurFilter() {
        return this.state.selectedFilter;
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
        let uid = 0;
        let state = 0;
        let filter = this.state.filterData[this.state.selectedFilter];
        if (this.state.partyData.length != 0) {
            uid = this.state.partyData[0]["uid"];
            state = 1;
        }

        customAxios.get('/MainParty/board/', {
            'params': {
                category: filter,
                type: state,
                page: uid,
            }
        }).then( (res) => {
            if(res.status == 200) {
                this.setState({
                    partyData: res.data.concat(this.state.partyData)
                })
            }
        }).catch( (error) =>{
            console.log('ERROR, @MainPartComponent <board>', error);
        });
    };

    loadMoreOlderData() {
        if (this.state.partyData.length == 0) return;

        let uid = this.state.partyData[this.state.partyData.length-1]["uid"];
        let state = 2;
        let filter = this.state.filterData[this.state.selectedFilter];

        customAxios.get('/MainParty/board/', {
            'params': {
                category: filter,
                type: state,
                page: uid,
            }
        }).then( (res) => {
            if(res.status == 200) {
                this.setState({
                    partyData: this.state.partyData.concat(res.data)
                })
            }
        }).catch( (error) =>{
            console.log('ERROR, @MainPartComponent <loadMoreOlderData>', error);
        });
    };
}

export default MainPartyComponent;
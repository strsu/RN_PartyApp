import React from 'react';

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
        };

        
    }

    componentDidMount() {

        customAxios.get("/MainParty/category/")
        .then((res) => {
            this.setState({
                filterData: res.data,
            });
        }).catch((err) => {
            console.log("MainPartComponent <filter> ", err);
        })

        customAxios.get('/MainParty/board/', {
            'params': {
                category: '모두 보기',
                type: 0,
                page: 0,
            }
        }).then( (res) => {
            this.setState({
                partyData: res.data 
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

    setCurFilter(params) {
        customAxios.get(`/mainParty/board/0/0/${this.state.filterData[params]}`)
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
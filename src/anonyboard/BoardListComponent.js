import React from 'react';
import BoardListPresenter from './BoardListPresenter';
import useStore, { useAnony } from '../../AppContext';
import { customAxios } from '../customAxios';

class BoardListComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@boardListComponent');

        this.state = {
            boardData: [],
            filterData: [],
            curFilter: '종합',
            error: null,
            selectedComment: -1,
            userUUID: useStore.getState().uuid,
            userSEX: useStore.getState().sex,
            setCurFilter: this.setCurFilter.bind(this),
            getCurFilter: this.getCurFilter.bind(this),
            loadMoreOlderData: this.loadMoreOlderData.bind(this),
            loadMoreNewerData: this.loadMoreNewerData.bind(this),
            refreshing: false,
            setRefreshing: this.setRefreshing.bind(this),
            getRefreshing: this.getRefreshing.bind(this),
        };

        

        // class component에서는 이렇게 해야 한다.
        //this.myRef = React.createRef();
        //this.BoardCard = this.BoardCard.bind(this);
        //this.BigCommentCard = this.BigCommentCard.bind(this);
        
    }

    componentDidMount() {

        customAxios.get('/Anony/category')
        .then( (res) => {
            this.setState({
                filterData: res.data
            })
            useAnony.getState().setFilter(res.data);
        }).catch( (error) =>{
            console.log('ERROR, @boardListComponent <filter>', error);
            this.setState({
                error: error
            })
        });

        customAxios.get('/Anony/board/', {
            'params': {
                category: this.state.curFilter,
                type: 0,
                page: 0,
            }
        }).then( (res) => {
            this.setState({
                boardData: res.data
            })
        }).catch( (error) =>{
            console.log('ERROR, @boardListComponent <board>', error);
            this.setState({
                error: error
            })
        });

    }

    componentDidUpdate() {

        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "flex" },
            //unmountOnBlur: false,
        });

        /*
            useReload.getState().setCurDP("");
            useReload.getState().setIsNeed(false);
        */
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

    setCurFilter(filter) {
        this.setState({
            curFilter: filter
        });

        customAxios.get('/Anony/board/', {
            'params': {
                category: filter,
                type: 0,
                page: 0,
            }
        }).then( (res) => {
            this.setState({
                boardData: res.data
            })
        }).catch( (error) =>{
            console.log('ERROR, @boardListComponent <setCurFilter>', error);
            this.setState({
                error: error
            })
        });
    }

    getCurFilter() {
        return this.state.curFilter;
    }

    loadMoreNewerData = () => {
        if ( this.state.boardData.length == 0) return;        
        let uid = this.state.boardData[0]["uid"];
        
        customAxios.get('/Anony/board/', {
            'params': {
                category: this.state.curFilter,
                type: 1,
                page: uid,
            }
        }).then( (res) => {
            if(res.status == 200) {
                this.setState({
                    boardData: res.data.concat(this.state.boardData)
                })
            }
            
        }).catch( (error) =>{
            console.log('ERROR, @boardListComponent <loadMoreOlderData>', error);
            this.setState({
                error: error
            })
        });
    };

    loadMoreOlderData = () => {
        let uid = this.state.boardData[this.state.boardData.length-1]["uid"];
        if ( uid == undefined) return;

        customAxios.get('/Anony/board/', {
            'params': {
                category: this.state.curFilter,
                type: 2,
                page: uid,
            }
        }).then( (res) => {
            if(res.status == 200) {
                this.setState({
                    boardData: this.state.boardData.concat(res.data)
                })
            }
            
        }).catch( (error) =>{
            console.log('ERROR, @boardListComponent <loadMoreOlderData>', error);
            this.setState({
                error: error
            })
        });
    };

    render() {
        return(
            <BoardListPresenter
                props={this.props}
                state={this.state}
            />
        );
        //return(<></>);
    }
}

export default BoardListComponent;

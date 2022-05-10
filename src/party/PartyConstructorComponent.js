import React from 'react';
import useStore from '../../AppContext';
import { customAxios } from '../customAxios';

import PartyConstructorPresenter from './PartyConstructorPresenter';

class PartyConstructorComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@PartyConstructorComponent');

        this.state = {
            partyData: [],
            loadData: this.loadData.bind(this),
        };

        
    }

    componentDidMount() {
        this.loadData(0);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    loadData(uid) {
        customAxios.get(`/SubParty/myparty/`)
        .then((res) => {
            // 가져오진 않았지만, 사용자 uuid를 체크했기 때문에
            // isMine = 1 무방
            /*for(let i=0; i< res.data.length; i++) {
                res.data[i].isMine = 1;
            }*/
            this.setState({
                partyData: Object.values(res.data).reverse(),
            });
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {
        return(
            <PartyConstructorPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default PartyConstructorComponent;
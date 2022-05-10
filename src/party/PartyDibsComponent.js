import React from 'react';
import useStore from '../../AppContext';
import { customAxios } from '../customAxios';

import PartyDibsPresenter from './PartyDibsPresenter';

class PartyDibsComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@PartyDibsComponent');

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
        customAxios.get(`/SubParty/mydibs/`)
        .then((res) => {
            this.setState({
                partyData: Object.values(res.data).reverse(),
            });
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return(
            <PartyDibsPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default PartyDibsComponent;
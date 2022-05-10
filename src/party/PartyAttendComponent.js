import React from 'react';
import useStore from '../../AppContext';
import { customAxios } from '../customAxios';

import PartyAttendPresenter from './PartyAttendPresenter';

class PartyAttendComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@PartyAttendComponent');

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
        customAxios.get(`/SubParty/myattend/`)
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
            <PartyAttendPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default PartyAttendComponent;
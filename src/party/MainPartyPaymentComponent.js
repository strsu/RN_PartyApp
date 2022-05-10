import React from 'react';
import useStore from '../../AppContext';
import MainPartyPaymentPresenter from './MainPartyPaymentPresenter';

class MainPartyPaymentComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@MainPartyPaymentComponent');

        this.state = {
        };
        
    }

    componentDidMount() {
        this.props.navigation.getParent().setOptions({
            headerShown: false,
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            headerShown: true,
        });
    }


    render() {
        return(
            <MainPartyPaymentPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default MainPartyPaymentComponent;
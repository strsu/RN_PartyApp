import React from 'react';
import useStore from '../../AppContext';
import MainPartyPaymentPresenter from './MainPartyPaymentPresenter';

class MainPartyPaymentComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@MainPartyPaymentComponent');

        this.state = {
            timeline: props.route.params.timeline,
            selectedTimeline: Object.keys(props.route.params.timeline)[Object.keys(props.route.params.timeline).length-1],

            setSelectedTimeline: this.setSelectedTimeline.bind(this),
        };
        
    }

    setSelectedTimeline(key) {
        this.setState({
            selectedTimeline: key,
        });
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
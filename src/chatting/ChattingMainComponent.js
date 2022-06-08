import React from 'react';
import { customAxios } from '../customAxios';
import ChattingMainPresenter from './ChattingMainPresenter';

class ChattingMainComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@ChattingMainComponent');

        this.state = {
        };
        
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {

        return(
            <ChattingMainPresenter
                props={this.props}
                state={this.state}
            />
        );
    }

}

export default ChattingMainComponent;
import React from 'react';
import { customAxios } from '../customAxios';
import ChattingMainPresenter from './ChattingMainPresenter';

class ChattingMainComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@ChattingMainComponent');

        this.state = {
            user: '',
            setUser: this.setUser.bind(this),
        };
        
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    setUser(param) {
        this.setState({
            user: param,
        });
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
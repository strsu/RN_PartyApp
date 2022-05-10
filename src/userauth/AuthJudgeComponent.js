import React from 'react';
import useStore from '../../AppContext';

import AuthJudgePresenter from './AuthJudgePresenter';

class AuthJudgeComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@AuthJudgeComponent');

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
            <AuthJudgePresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default AuthJudgeComponent;
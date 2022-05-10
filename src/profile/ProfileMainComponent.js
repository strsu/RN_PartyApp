import React from 'react';
import useStore from '../../AppContext';

import ProfileMainPresenter from './ProfileMainPresenter';

class ProfileMainComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@BoardDetailComponent');

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
            <ProfileMainPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default ProfileMainComponent;
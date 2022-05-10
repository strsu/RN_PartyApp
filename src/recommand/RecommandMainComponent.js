import React from 'react';
import useStore from '../../AppContext';

import RecommandMainPresenter from './RecommandMainPresenter';

class RecommandMainComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@RecommandMainComponent');

        this.state = {
            userData: [
                'http://192.168.1.243:4000/common/getImage/anony+1.jpg',
                'http://192.168.1.243:4000/common/getImage/anony+2.jpg',
                'http://192.168.1.243:4000/common/getImage/anony+3.jpg',
                'http://192.168.1.243:4000/common/getImage/anony+4.jpg'
                ],
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
            <RecommandMainPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default RecommandMainComponent;
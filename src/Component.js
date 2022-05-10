import React from 'react';
import useStore from '../../AppContext';

class Component extends React.Component {

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
            <BoardDetailPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default Component;
import React from 'react';
import {useRegister} from '../../AppContext';

import IntroducePresenter from './IntroducePresenter';

class IntroduceComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@IntroduceComponent');

        this.state = {
            character: '',
            aboutMe: '',

            setCharacter: this.setCharacter.bind(this),
            setAboutMe: this.setAboutMe.bind(this),
            verify: this.verify.bind(this),
            next: this.next.bind(this),
        };
        
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    setCharacter(param) {
        this.setState({
            character: param,
        });
    }

    setAboutMe(param) {
        this.setState({
            aboutMe: param,
        });
    }

    verify() {
        
        if( this.state.aboutMe.length > 0 &&
            this.state.character.length > 0 ) {
                useRegister.getState().setCharacter(this.state.character);
                useRegister.getState().setIntroduce(this.state.aboutMe);
                useRegister.getState().doRegister();
                setTimeout(() => {this.next()}, 500);
            }
    }

    next() {
        this.props.navigation.popToTop();
    }

    render() {
        return(
            <IntroducePresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default IntroduceComponent;
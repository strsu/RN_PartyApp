import React from 'react';

import useStore, { useRegister } from '../../AppContext';
import EmailPresenter from './EmailPresenter';

class EmailComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@EmailComponent');

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            setEmail: this.setEmail.bind(this),
            setPassWord: this.setPassWord.bind(this),
            setPassWordConfirm: this.setPassWordConfirm.bind(this),
            compare: this.compare.bind(this),
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

    setEmail(param) {
        this.setState({
            email: param
        });
    }

    setPassWord(param) {
        this.setState({
            password: param,
        });
    }

    setPassWordConfirm(param) {
        this.setState({
            passwordConfirm: param,
        });
    }

    compare() {
        return this.state.password == this.state.passwordConfirm ? this.state.password == '' ? 0 : 1 : 0;
    }

    verify() {
        if (this.state.email    != '' &&
            this.state.password   != '') {

            useRegister.getState().setEmail(this.state.email);
            useRegister.getState().setPassword(this.state.password);
            this.next();
            
        } else {

        }
        
    }

    next() {
        this.props.navigation.navigate('Profile');
    }

    render() {
        return(
            <EmailPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default EmailComponent;
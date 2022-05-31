import React from 'react';
import { customAxios } from '../customAxios';
import messaging, { firebase } from '@react-native-firebase/messaging';
import XMPP from 'react-native-xmpp';

import { storeUserSession } from '../util/EncryptedStorage';

import useStore, { useChat } from '../../AppContext';
import LoginPresenter from './LoginPresenter';
class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@BoardDetailComponent');

        this.state = {
            id: '',
            pw: '',

            setID: this.setID.bind(this),
            setPW: this.setPW.bind(this),
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

    verify() {
        if (this.state.id != '' &&
            this.state.pw != '') {

            
            firebase.messaging().getToken()
                .then(fcmToken => {
                    if (fcmToken) {
                        const json = {
                            id: this.state.id,
                            pw: this.state.pw,
                            token: fcmToken
                        }
                        customAxios.post('/Auth/login/', json)
                            .then((res) => {
                                if (res.data != false) {
                                    const cookies = res.headers['set-cookie'][0].replace(/; HttpOnly; Path=\//g, '').replace(/ /g, '').split(',');

                                    useStore.getState().setSEX(res.data.sex);
                                    useStore.getState().setGRADE(res.data.grade);
                                    useStore.getState().setUUID(res.data.uuid);
                                    useStore.getState().setAccessToken(cookies[0].substring(13));
                                    //useStore.getState().setRefreshToken(cookies[1].substring(14));
                                    useStore.getState().setFireBaseToken(fcmToken);

                                    storeUserSession(this.state.id, cookies[0].substring(13));

                                    useChat.getState().setID('user' + res.data.uid + '@localhost');
                                    XMPP.on('loginError', useChat.getState().onLoginError());
                                    XMPP.on('error', (msg) => useChat.getState().onError(msg));
                                    XMPP.on('disconnect', (msg) => useChat.getState().onDisconnect(msg));
                                    XMPP.on('login', useChat.getState().onLogin());
                                    XMPP.on('message', (msg) => useChat.getState().onReceiveMessage(msg));;
                                    XMPP.on('iq', (message) => console.log('IQ:' + JSON.stringify(message)));
                                    XMPP.on('presence', (message) => console.log('PRESENCE:' + JSON.stringify(message)));

                                    useChat.getState().login();
                                    
                                    customAxios.defaults.headers.uuid = res.data.uuid;
                                    if (res.headers['set-cookie'] !== undefined) {
                                        this.next(res.data.grade == 'U' ? true : false);
                                    }
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    } else {
                        // user doesn't have a device token yet
                    }
                });

        }
    }

    next(param) {
        param ? this.props.navigation.navigate('contentNavi') : this.props.navigation.navigate('AuthScreen');
    }

    setID(param) {
        this.setState({
            id: param,
        });
    }

    setPW(param) {
        this.setState({
            pw: param,
        });
    }


    render() {
        return (
            <LoginPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default LoginComponent;
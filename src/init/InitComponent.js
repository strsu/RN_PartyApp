import React from 'react';
import { Animated, Dimensions } from 'react-native';

import useStore, { useChat } from '../../AppContext';
import InitPresenter from './InitPresenter';
import { customAxios } from '../customAxios';
import XMPP from 'react-native-xmpp';

import { retrieveUserSession, storeUserSession } from '../util/EncryptedStorage';


class InitComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@InitComponent');

        this.state = {
            value: new Animated.Value(0),
            value2: new Animated.Value(0),
            color: ['red', 'blue'],
            position: new Animated.ValueXY({ x: 100, y: 800 }),
            positions: [
                new Animated.ValueXY({ x: 100, y: 800 }),
                new Animated.ValueXY({ x: 0, y: 0 })
            ],
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,

            _fadeIn: this._fadeIn.bind(this),
            _getStyle: this._getStyle.bind(this),
            _getStyle_move: this._getStyle_move.bind(this),

        };


    }

    async componentDidMount() {
        this._moveX();
        this._fadeIn();

        await retrieveUserSession()
            .then((ures) => {
                ures = JSON.parse(ures);
                const json = {
                    email: ures.email,
                    accessToken: ures.token
                }
                customAxios.post('/Auth/login/', json)
                    .then((res) => {
                        if (res.status == 200) {
                            const cookies = res.headers['set-cookie'][0].replace(/; HttpOnly; Path=\//g, '').replace(/ /g, '').split(',');

                            useStore.getState().setSEX(res.data.sex);
                            useStore.getState().setGRADE(res.data.grade);
                            useStore.getState().setUUID(res.data.uuid);
                            useStore.getState().setAccessToken(cookies[0].substring(13));
                            //useStore.getState().setRefreshToken(cookies[1].substring(14));
                            useStore.getState().setFireBaseToken(res.data.fcmToken);

                            storeUserSession(ures.email, cookies[0].substring(13));

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
                                res.data.grade == 'U' ? this.props.navigation.navigate('contentNavi') : false;
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    UNSAFE_componentWillMount() {
        this.x = this.state.value2.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [40, 60, 35, 65, 40, 60, 50, 30, 50, 60, 70]
        });
        this.y = this.state.value2.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [400, 350, 300, 250, 200, 150, 100, 80, 60, 40, 20]
        });
    }

    _moveX() {
        Animated.timing(
            this.state.value2, {
            toValue: 1,
            //friction : 3,
            //tension : 20,
            //bounciness: 10,
            //speed: 1,
            duration: 3000,
            delay: 0,
            useNativeDriver: false,
        }).start();
    }

    _moveX2(position) {
        Animated.timing(
            position, {
            toValue: 1,
            //friction : 3,
            //tension : 20,
            //bounciness: 10,
            //speed: 1,
            duration: 3000,
            delay: 0,
            useNativeDriver: false,
        }).start();
    }

    _fadeIn() {
        Animated.timing(
            this.state.value, {
            toValue: 1,
            duration: 5000,
            delay: 2000,
            useNativeDriver: false,
        }).start();
    }

    _getStyle() {
        return {
            flex: 1,
            backgroundColor: this.state.color,
            opacity: this.state.value,
        }
    }

    _getStyle_move() {
        return {
            position: 'absolute',
            borderRadious: 100,
            transform: [
                { translateX: this.x },
                { translateY: this.y },
            ],
            backgroundColor: this.color,
            //opacity: this.state.value,
        }
    }



    render() {
        return (
            <InitPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default InitComponent;
import React, { Suspense } from 'react';
import { Text } from 'react-native';
import { customAxios } from '../customAxios';
import { useRegister, useAuth } from '../../AppContext';
import AuthMainPresenter from './AuthMainPresenter';

class AuthMainComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@AuthMainComponent');

        this.state = {
            isReturnedPic: '',
            isReturnedProfessional: '',
            isReturnedBusinessman: '',
            isReturnedHighSalary: '',
            isReturnedA100million: '',
            isReturnedGangnamAPT: '',
            isReturnedExpensiveAPT: '',
            isReturnedForeignCar: '',
            isReturnedSuperCar: '',
            isReturnedHighAsset: '',
            isReturnedUltraHighAsset: '',
            isReturnedEliteFamily: '',
            isReturnedHighCaliberFamily: '',
            isReturnedPrestigiousUniv: '',
            isReturnedAboardPrestigiousUniv: '',
            isReturnedHeight: '',

            isJudging: false,
            isPass: false,

            verify: this.verify.bind(this),
            next: this.next.bind(this),
        };


    }

    componentDidMount() {
        useRegister.getState().setRegisterFinish(false);
        //useAuth.getState().fetch();

        customAxios.get('/Auth/badge/')
            .then((res) => {
                let returnCnt = 0;
                let confirmCnt = 0;

                if (res.data.length == 0) {
                    useAuth.getState().setIsJudging(false);
                } else {
                    useAuth.getState().setIsJudging(true);
                }

                res.data.map(params => {
                    let pic = params.ual_image.replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',');
                    if (params.ual_type != 'mainPic' && params.ual_type != 'requirePic') {
                        if (pic.length == 1) pic = pic.concat(['', '']);
                        else if (pic.length == 2) pic = pic.concat(['']);
                    }

                    // 반려된게 있다면 심사도 종료, 
                    if (params.ual_return != '') {
                        returnCnt += 1; // 반려 개수를 카운트
                    }

                    if (params.ual_confirm != '') {
                        confirmCnt += 1; // 심사통과 개수 카운트
                    }

                    switch (params.ual_type) {
                        case 'mainPic': {
                            useAuth.getState().setMainPic(pic);
                            useAuth.getState().setIsReturnedMainPic(params.ual_return);
                            this.setState({ isReturnedPic: this.state.isReturnedPic == '' ? params.ual_return : this.state.isReturnedPic });
                            break;
                        }
                        case 'requirePic': {
                            useAuth.getState().setRequirePic(pic);
                            useAuth.getState().setIsReturnedRequirePic(params.ual_return);
                            this.setState({ isReturnedPic: this.state.isReturnedPic == '' ? params.ual_return : this.state.isReturnedPic });
                            break;
                        }
                        case 'extraPic': {
                            useAuth.getState().setExtraPic(pic);
                            useAuth.getState().setIsReturnedExtraPic(params.ual_return);
                            this.setState({ isReturnedPic: this.state.isReturnedPic == '' ? params.ual_return : this.state.isReturnedPic });
                            break;
                        }
                        case 'professional': {
                            useAuth.getState().setProfessional(pic);
                            useAuth.getState().isReturnedProfessional(params.ual_return);
                            this.setState({ isReturnedProfessional: params.ual_return });
                            break;
                        }
                        case 'businessman': {
                            useAuth.getState().setBusinessman(pic);
                            useAuth.getState().setIsReturnedBusinessman(params.ual_return);
                            this.setState({ isReturnedBusinessman: params.ual_return });
                            break;
                        }
                        case 'highSalary': {
                            useAuth.getState().setHighSalary(pic);
                            useAuth.getState().setIsReturnedHighSalary(params.ual_return);
                            this.setState({ isReturnedHighSalary: params.ual_return });
                            break;
                        }
                        case 'a100million': {
                            useAuth.getState().setA100million(pic);
                            useAuth.getState().setIsReturnedA100million(params.ual_return);
                            this.setState({ isReturnedA100million: params.ual_return });
                            break;
                        }
                        case 'gangnamAPT': {
                            useAuth.getState().setGangnamAPT(pic);
                            useAuth.getState().setIsReturnedGangnamAPT(params.ual_return);
                            this.setState({ isReturnedGangnamAPT: params.ual_return });
                            break;
                        }
                        case 'expensiveAPT': {
                            useAuth.getState().setExpensiveAPT(pic);
                            useAuth.getState().setIsReturnedExpensiveAPT(params.ual_return);
                            this.setState({ isReturnedExpensiveAPT: params.ual_return });
                            break;
                        }
                        case 'foreignCar': {
                            useAuth.getState().setForeignCar(pic);
                            useAuth.getState().setIsReturnedForeignCar(params.ual_return);
                            this.setState({ isReturnedForeignCar: params.ual_return });
                            break;
                        }
                        case 'superCar': {
                            useAuth.getState().setSuperCar(pic);
                            useAuth.getState().setIsReturnedSuperCar(params.ual_return);
                            this.setState({ isReturnedSuperCar: params.ual_return });
                            break;
                        }
                        case 'highAsset': {
                            useAuth.getState().setHighAsset(pic);
                            useAuth.getState().setIsReturnedHighAsset(params.ual_return);
                            this.setState({ isReturnedHighAsset: params.ual_return });
                            break;
                        }
                        case 'ultraHighAsset': {
                            useAuth.getState().setUltraHighAsset(pic);
                            useAuth.getState().setIsReturnedUltraHighAsset(params.ual_return);
                            this.setState({ isReturnedUltraHighAsset: params.ual_return });
                            break;
                        }
                        case 'eliteFamily': {
                            useAuth.getState().setEliteFamily(pic);
                            useAuth.getState().setIsReturnedEliteFamily(params.ual_return);
                            this.setState({ isReturnedEliteFamily: params.ual_return });
                            break;
                        }
                        case 'highCaliberFamily': {
                            useAuth.getState().highCaliberFamily(pic);
                            useAuth.getState().setIsReturnedHighCaliberFamily(params.ual_return);
                            this.setState({ isReturnedHighCaliberFamily: params.ual_return });
                            break;
                        }
                        case 'prestigiousUniv': {
                            useAuth.getState().setPrestigiousUniv(pic);
                            useAuth.getState().setIsReturnedPrestigiousUniv(params.ual_return);
                            this.setState({ isReturnedPrestigiousUniv: params.ual_return });
                            break;
                        }
                        case 'aboardPrestigiousUniv': {
                            useAuth.getState().setAboardPrestigiousUniv(pic);
                            useAuth.getState().setIsReturnedAboardPrestigiousUniv(params.ual_return);
                            this.setState({ isReturnedAboardPrestigiousUniv: params.ual_return });
                            break;
                        }
                        case 'height': {
                            useAuth.getState().setHeight(pic);
                            useAuth.getState().setIsReturnedHeight(params.ual_return);
                            this.setState({ isReturnedHeight: params.ual_return });
                            break;
                        }
                    }

                    if (returnCnt == 0 && confirmCnt == 0) {
                        // 심사중
                        useAuth.getState().setIsJudging(true);
                        useAuth.getState().setIsPass(false);
                        this.setState({
                            isJudging: true,
                            isPass: false,
                        });
                    } else if (returnCnt == 0 && confirmCnt != 0) {
                        // 심사완료, 통과
                        useAuth.getState().setIsJudging(false);
                        useAuth.getState().setIsPass(true);
                        this.setState({
                            isJudging: false,
                            isPass: true,
                        });
                    } else {
                        // 심사완료, 불통
                        useAuth.getState().setIsJudging(false);
                        useAuth.getState().setIsPass(false);
                        this.setState({
                            isJudging: false,
                            isPass: false,
                        });
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    verify() {
        if(!this.state.isJudging && this.state.isPass) {
            this.next();
        } else {
            useAuth.getState().verify();
        }
    }

    next() {
        useRegister.getState().setAuthFinish(true);
        this.props.navigation.pop();
    }

    render() {
        return (
            <AuthMainPresenter
                props={this.props}
                state={this.state}
            />

        );
    }
}

export default AuthMainComponent;
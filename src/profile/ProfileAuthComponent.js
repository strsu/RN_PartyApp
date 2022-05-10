import React from 'react';
import { customAxios } from '../customAxios';
import { useRegister } from '../../AppContext';
import ProfileAuthPresenter from './ProfileAuthPresenter';

class ProfileAuthComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@ProfileAuthComponent');

        this.state = {
            verify: this.verify.bind(this),
            next: this.next.bind(this),
        };

        
    }

    componentDidMount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "none" },
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "flex" },
        });
    }

    verify() {
        customAxios.get('/login/auth')
        .then((res)=>{
            // 인증성공시
            if(res.data.authComp.length > 0) {
                this.next();
            }
        }).catch((err) => {

        })
    }

    next() {
        useRegister.getState().setAuthFinish(true);
        this.props.navigation.pop();
    }

    render() {
        return(
            <ProfileAuthPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default ProfileAuthComponent;
import React from 'react';
import { Dimensions } from 'react-native';
import useStore from '../../AppContext';

import RecommandDetailPresenter from './RecommandDetailPresenter';

class RecommandDetailComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@RecommandDetailComponent');

        console.log(props.route.params.params);

        this.state = {
            userData: props.route.params.params,
            imageData: [
                'http://192.168.1.243:4000/common/getImage/anony+1.jpg',
                'http://192.168.1.243:4000/common/getImage/anony+2.jpg',
                'http://192.168.1.243:4000/common/getImage/anony+3.jpg',
                'http://192.168.1.243:4000/common/getImage/anony+4.jpg',
                'http://192.168.1.243:4000/common/getImage/anony+5.jpg',
                'http://192.168.1.243:4000/common/getImage/anony+6.jpg'
                ],
            curImageIdx: 0,

            myRef: React.createRef(),
            leftImg: this.leftImg.bind(this),
            rightImg: this.rightImg.bind(this),
            imgSwipe: this.imgSwipe.bind(this),

            rateVal: 0,
            rateCalc: this.rateCalc.bind(this),
            windowWidth: Dimensions.get('window').width,
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

    rateCalc(x) {
        let r = 0;
        if(x >= parseInt(this.state.windowWidth/1.15)) console.log(5);
        else if(x >= parseInt(this.state.windowWidth/1.45)) console.log(4);
        else if(x >= parseInt(this.state.windowWidth/2))console.log(3);
        else if(x >= parseInt(this.state.windowWidth/3.2))console.log(2);
        else if(x >= parseInt(this.state.windowWidth/7.8))console.log(1);
        //console.log(x, r);
    }

    leftImg() {
        this.setState({
            curImageIdx: this.state.curImageIdx == 0 ? 0 : (this.state.curImageIdx-1)%6,
        });
    }

    rightImg() {
        this.setState({
            curImageIdx: this.state.curImageIdx == 5 ? 5 : (this.state.curImageIdx+1)%6,
        });
    }

    imgSwipe(param) {
        let velocity = param.velocity.x;
        let curX = parseInt(param.contentOffset.x);
        let winSize = parseInt(param.layoutMeasurement.width);
        
        // 이미지의 1/8이상 움직으면 스와이프 활성
        const criteria = parseInt(param.layoutMeasurement.width / 8);
        console.log(velocity, curX, winSize, criteria);
        // 오른쪽으로 스와이프
        if(velocity > 0) {
            if(curX > criteria + winSize * 5) this.state.myRef.current.scrollToOffset({offset: winSize * 6, animated: false});
            else if(curX > criteria + winSize * 4) this.state.myRef.current.scrollToOffset({offset: winSize * 5, animated: false});
            else if(curX > criteria + winSize * 3) this.state.myRef.current.scrollToOffset({offset: winSize * 4, animated: false});
            else if(curX > criteria + winSize * 2) this.state.myRef.current.scrollToOffset({offset: winSize * 3, animated: false});
            else if(curX > criteria + winSize * 1) this.state.myRef.current.scrollToOffset({offset: winSize * 2, animated: false});
            else if(curX > criteria) this.state.myRef.current.scrollToOffset({offset: winSize * 1, animated: false});
        } else {

        }
    }

    render() {
        return(
            <RecommandDetailPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default RecommandDetailComponent;
import React from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import useStore from '../../AppContext';
import MainPartyReviewPresenter from './MainPartyReviewPresenter';

class MainPartyReviewComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@MainPartyReviewComponent');

        this.state = {
            uid: props.route.params.uid,
            starCount: 3.5,
            onStarRatingPress: this.onStarRatingPress.bind(this),
        };

    }

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }

    componentDidMount() {
        this.props.navigation.getParent().setOptions({
            headerShown: false,
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            headerShown: true,
            //headerShown: TapGestureHandler,
        });
    }


    render() {
        return(
            <MainPartyReviewPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default MainPartyReviewComponent;
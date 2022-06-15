import React from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import useStore from '../../AppContext';
import MainPartyReviewPresenter from './MainPartyReviewPresenter';
import ImagePicker from 'react-native-image-crop-picker';

class MainPartyReviewComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@MainPartyReviewComponent');

        this.state = {
            uid: props.route.params.uid,
            AttendTime: props.route.params.AttendTime,
            images: props.route.params.images,
            airbnb: ['너무 별로에요!','좀 아쉬워요','그냥 그래요','좋았어요','이런 파티 드루와~'],
            starCount: 5,
            onStarRatingPress: this.onStarRatingPress.bind(this),

            text: '',
            onTextChange: this.onTextChange.bind(this),
            userImg: '',
            openGallery: this.openGallery.bind(this),
        };

    }

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    }

    onTextChange(text) {
        this.setState({
            text: text,
        });
    }

    openGallery() {
        ImagePicker.openPicker({
            width: 480,
            height: 480,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 0.9,
        }).then(image => {
            this.setState({
                userImg: image.data,
            })
        }).catch((err) => {
            console.log(err);
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

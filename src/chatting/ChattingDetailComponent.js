import React from 'react';
import { customAxios } from '../customAxios';
import useStore, {useChat} from '../../AppContext';
import ChattingDetailPresenter from './ChattingDetailPresenter';

class ChattingDetailComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@ChattingDetailComponent');

        this.state = {
            data: useChat.getState().conversation[props.route.params.user],
            userName: props.route.params.user,
        };
    }

    componentDidMount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "none" },
        });
    }

    componentDidUpdate() {
        console.log('@componentDidUpdate');
    }

    shouldComponentUpdate() {
        console.log('@shouldComponentUpdate');
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "flex" },
        });
    }


    render() {
        return(
            <ChattingDetailPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default ChattingDetailComponent;
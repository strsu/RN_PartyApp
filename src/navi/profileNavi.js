import * as React from 'react';
import { Text, View, TouchableOpacity, Animated, ToastAndroid } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';

import ProfileMainComponent from '../profile/ProfileMainComponent';
import ProfileAuthComponent from '../profile/ProfileAuthComponent';
import ProfileModifyComponent from '../profile/ProfileModifyComponent';

import { StackHeader } from './TabHeader';

const ProfileStack = createNativeStackNavigator();
const ProfileScreenNavigator = () => {

    return (
        <ProfileStack.Navigator
            initialRouteName='ProfileMain'
        >
            <ProfileStack.Screen
                name="ProfileMain"
                component={ProfileMainComponent}
                options={{
                    title: '',
                    header: () => StackHeader('프로필'),
                }}
            />

            <ProfileStack.Screen
                name="ProfileAuth"
                component={ProfileAuthComponent}
                options={{
                    title: '',
                    headerBackButtonMenuEnabled: true,
                }}
            />

            <ProfileStack.Screen
                name="ProfileModify"
                component={ProfileModifyComponent}
                options={{
                    title: '',
                    headerBackButtonMenuEnabled: true,
                }}
            />

        </ProfileStack.Navigator>
    );
}
export { ProfileScreenNavigator }

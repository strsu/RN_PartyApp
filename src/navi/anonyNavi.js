import * as React from 'react';
import { Text, View, TouchableOpacity, Animated, ToastAndroid } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';

import BoardListComponent from '../anonyboard/BoardListComponent'
import BoardWritingComponent from '../anonyboard/BoardWritingComponent';
import BoardDetailComponent from '../anonyboard/BoardDetailComponent';

import {StackHeader} from './TabHeader';

const AnonyStack = createNativeStackNavigator();
const AnonyScreenNavigator = () => {

  return(
    <AnonyStack.Navigator
      initialRouteName='BoardList'
    >
      <AnonyStack.Screen 
        name="BoardList"
        component={BoardListComponent}
        options={{
          title: '',
          header: () => StackHeader('라운지'),
        }}
      />
      <AnonyStack.Screen
        name="BoardDetail"
        component={BoardDetailComponent}
        options={{
          title: '',
          headerBackButtonMenuEnabled : true,
        }}
        />
      <AnonyStack.Screen
        name="BoardWriting"
        component={BoardWritingComponent}
        options={{
            headerShown: false,
          //header: (props) => WritingHeader(props),
        }}
        />

    </AnonyStack.Navigator>
  );
}
export {AnonyScreenNavigator}

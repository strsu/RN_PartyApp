import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';

import ChattingMainComponent from '../chatting/ChattingMainComponent';
import ChattingDetailComponent from '../chatting/ChattingDetailComponent';
import { StackHeader } from './TabHeader';

const ChattingStack = createNativeStackNavigator();
const ChattingNavigator = () => {

  return(
    <ChattingStack.Navigator
        initialRouteName='ChattingMain'
    >
      <ChattingStack.Screen 
        name="ChattingMain"
        component={ChattingMainComponent}
        options={{
          title: '',
          header: () => StackHeader('채팅'),
        }}
      />
      <ChattingStack.Screen 
        name="ChattingDetail"
        component={ChattingDetailComponent}
        options={{
          title: '',
          headerBackButtonMenuEnabled : true,
        }}
      />

    </ChattingStack.Navigator>
  );
}
export default ChattingNavigator;

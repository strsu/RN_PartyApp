import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StackHeader} from './TabHeader';

import RecommandMainComponent from '../recommand/RecommandMainComponent';
import RecommandDetailComponent from '../recommand/RecommandDetailComponent';

const RecommandStack = createNativeStackNavigator();
const RecommandScreenNavigator = () => {

  return(
    <RecommandStack.Navigator
      initialRouteName='BoardList'
    >
      <RecommandStack.Screen 
        name="RecommandMain"
        component={RecommandMainComponent}
        options={{
          title: '',
          header: () => StackHeader('추천'),
        }}
      />
      <RecommandStack.Screen 
        name="RecommandDetail"
        component={RecommandDetailComponent}
        options={{
          title: '',
          //headerShown: false,
          headerBackButtonMenuEnabled: true,
        }}
      />

    </RecommandStack.Navigator>
  );
}
export {RecommandScreenNavigator}

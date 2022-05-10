import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthMainComponent from '../userauth/AuthMainComponent';
import AuthJudgeComponent from '../userauth/AuthJudgeComponent';
import AuthPresenter_gangnamAPT from '../userauth/AuthPresenter_gangnamAPT';
import AuthComponent_Face from '../userauth/AuthComponent_Face';

import {StackHeader} from './TabHeader';

const AuthStack = createNativeStackNavigator();
const AuthScreenNavigator = () => {

  return(
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name="AuthMain"
        component={AuthMainComponent}
        options={{
          title: '',
          headerShown: false,
        }}
      />

<AuthStack.Screen 
        name="AuthJudge"
        component={AuthJudgeComponent}
        options={{
          title: '',
          headerShown: false,
        }}
      />

      <AuthStack.Screen 
        name="Auth_gangnamAPT"
        component={AuthPresenter_gangnamAPT}
        options={{
          title: '',
          headerBackButtonMenuEnabled : true,
        }}
      />

      <AuthStack.Screen 
        name="Auth_Face"
        component={AuthComponent_Face}
        options={{
          title: '',
          headerBackButtonMenuEnabled : true,
        }}
      />

    </AuthStack.Navigator>
  );
}
export {AuthScreenNavigator}

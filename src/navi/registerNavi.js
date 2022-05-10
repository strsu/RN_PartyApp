import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';

import EmailComponent from '../init/EmailComponent';
import ProfileComponent from '../init/ProfileComponent';
import IntroduceComponent from '../init/IntroduceComponent';

const RegisterStack = createNativeStackNavigator();
const RegisterNavigator = () => {

  return(
    <RegisterStack.Navigator>
      <RegisterStack.Screen 
        name="Email"
        component={EmailComponent}
        options={{
          title: '',
          headerBackButtonMenuEnabled: true,
        }}
      />
      <RegisterStack.Screen 
        name="Profile"
        component={ProfileComponent}
        options={{
          title: '',
          headerBackButtonMenuEnabled: true,
        }}
      />
      <RegisterStack.Screen 
        name="Introduce"
        component={IntroduceComponent}
        options={{
          title: '',
          headerBackButtonMenuEnabled: true,
        }}
      />

    </RegisterStack.Navigator>
  );
}
export default RegisterNavigator;

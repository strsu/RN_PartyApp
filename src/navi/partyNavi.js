import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { TopTabHeader, TopTabHeader_MY } from './TabHeader';

import MainPartyComponent from '../party/MainPartyComponent';
import MainPartyDetailComponent from '../party/MainPartyDetailComponent';
import MainPartyPaymentComponent from '../party/MainPartyPaymentComponent';
import MainPartyReviewComponent from '../party/MainPartyReviewComponent';

import SubPartyComponent from '../party/SubPartyComponent';
import SubPartyDetailComponent from '../party/SubPartyDetailComponent';
import SubPartyWritingComponent from '../party/SubPartyWritingComponent';

import PartyAttendComponent from '../party/PartyAttendComponent';
import PartyDibsComponent from '../party/PartyDibsComponent';
import PartyConstructorComponent from '../party/PartyConstructorComponent';

const PartyStack = createNativeStackNavigator();
const PartyNavigator = (props) => {
  return (
    <PartyStack.Navigator
      initialRouteName={props.route.params.screen}
    >
      <PartyStack.Screen
        name="MainPartyDetail"
        component={MainPartyDetailComponent}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <PartyStack.Screen
        name="MainPartyPayment"
        component={MainPartyPaymentComponent}
        options={{
          title: '',
          //headerShown: false,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <PartyStack.Screen
        name="MainPartyReview"
        component={MainPartyReviewComponent}
        options={{
          title: '',
          //headerShown: false,
          headerBackButtonMenuEnabled: true,
        }}
      />

      <PartyStack.Screen
        name="SubPartyDetail"
        component={SubPartyDetailComponent}
        options={{
          title: '',
          //headerShown: false,
          headerBackButtonMenuEnabled: true,
        }}
      />

      <PartyStack.Screen
        name="SubPartyWriting"
        component={SubPartyWritingComponent}
        options={{
          title: '',
          headerShown: false,
        }}
      />

      <PartyStack.Screen
        name="MyParty"
        component={MyPartyTab}
        options={{
          title: '',
          headerShown: false,
        }}
      />

    </PartyStack.Navigator>
  );
}

export default PartyNavigator;

const Tab = createMaterialTopTabNavigator();
const PartyTab = () => {
  return (

    <Tab.Navigator
      tabBar={(props) => <TopTabHeader {...props} />}
      screenOptions={{
        tabBarStyle: { display: 'flex' },
        tabBarVisible: false,
        swipeEnabled: true,
        lazy: true,

        // 스크롤 하는동안 스와이프 방지 // https://lifesaver.codes/answer/how-to-disable-the-vertical-scroll
        tabBarScrollEnabled: false,
        tabBarBounces: false,

        //////
      }}
      backBehavior='none'
    >

      <Tab.Screen name="Main" component={MainPartyComponent} />
      <Tab.Screen name="Sub" component={SubPartyComponent} />

    </Tab.Navigator>

  );
}

export { PartyTab };

const MyTab = createMaterialTopTabNavigator();
const MyPartyTab = () => {
  return (
    <MyTab.Navigator
      tabBar={(props) => <TopTabHeader_MY {...props} />}
      screenOptions={{
        tabBarStyle: { display: 'flex' },
        tabBarVisible: false,
      }}
    >
      <MyTab.Screen name="PartyConstructor" component={PartyConstructorComponent} />
      <MyTab.Screen name="PartyAttend" component={PartyAttendComponent} />
      <MyTab.Screen name="PartyDibs" component={PartyDibsComponent} />
    </MyTab.Navigator>
  );
}

import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import useStore, {useBadge} from '../../AppContext';

import {AnonyScreenNavigator} from './anonyNavi';
import {PartyTab} from './partyNavi';
import ChattingNavigator from './chattingNavi';
import { RecommandScreenNavigator } from './recommandNavi';
import { ProfileScreenNavigator } from './profileNavi';


const Tab = createBottomTabNavigator();

function ContentNavigator() {
    const screenName = ["recommand", "party", "anony", "chatting", "profile"];
  
    const isDarkMode = useColorScheme() === 'dark';
    const setIsDarkMode = useStore((state) => state.setIsDarkMode);
    setIsDarkMode(isDarkMode);

    return (
            <Tab.Navigator
                initialRouteName={screenName[1]}
                screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === screenName[0]) {
                    iconName = focused ? 'heart' : 'heart';
                    } else if (route.name === screenName[1]) {
                    iconName = focused ? 'clockcircleo' : 'clockcircleo';
                    } else if (route.name === screenName[2]) {
                    iconName = focused ? 'home' : 'home';
                    } else if (route.name === screenName[3]) {
                    iconName = focused ? 'rocket1' : 'rocket1';
                    } else if (route.name === screenName[4]) {
                    iconName = focused ? 'cloudo' : 'cloudo';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#BAE7AF',
                tabBarInactiveTintColor: 'gray',
                tabBarActiveBackgroundColor: isDarkMode ? Colors.black : Colors.white,
                tabBarInactiveBackgroundColor: isDarkMode ? Colors.black : Colors.white, 
                tabBarShowLabel: false,
                headerShown: false,

                //unmountOnBlur: true, // 탭 누를때마다 새로고침
                })}
                backBehavior='none'
            >

                <Tab.Screen name={screenName[0]} component={RecommandScreenNavigator} />
                <Tab.Screen name={screenName[1]} component={PartyTab} />
                <Tab.Screen name={screenName[2]} component={AnonyScreenNavigator} options={{tabBarBadge: useBadge.getState().anony}} />
                <Tab.Screen name={screenName[3]} component={ChattingNavigator} 
                    options={{
                        tabBarBadge: useBadge.getState().chat, 
                        tabBarBadgeStyle: {
                            fontSize: 12,
                            height: 20,
                            width: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }
                    }} />
                <Tab.Screen name={screenName[4]} component={ProfileScreenNavigator} />

            </Tab.Navigator>
    );
}

export default ContentNavigator;
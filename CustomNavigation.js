import * as React from 'react';
import { Text, View, TouchableOpacity, Animated, ToastAndroid } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

/* 첫 번째 탭 */
import RecommandScreen from './Screen/main/recommand/recommandScreen';

/* 두 번째 탭 */
import HistoryScreen from './Screen/main/history/historyScreen';

/* 세 번째 탭 */
import PartyScreen_Main         from './Screen/main/party/main/partyScreen_Main';
import PartyScreen_MainWriting  from './Screen/main/party/main/partyScreen_MainWriting';
import PartyScreen_MainShow     from './Screen/main/party/main/partyScreen_MainShow';

import PartyScreen_Sub          from './Screen/main/party/sub/partyScreen_Sub';
import PartyScreen_SubWriting   from './Screen/main/party/sub/partyScreen_SubWriting';
import PartyScreen_SubShow      from './Screen/main/party/sub/partyScreen_SubShow';

import PartyScreen_My     from './Screen/main/party/my/partyScreen_My';
import PartyScreen_Add    from './Screen/main/party/my/partyScreen_Add';
import PartyScreen_Attend from './Screen/main/party/my/partyScreen_Attend';

/* 네 번째 탭 */


/* 다섯 번째 탭 */
import RateProfileScreen  from './Screen/main/rateNprofile/rateProfileScreen';


const StackHeader = (title) => {
  return (
    <View style={{
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderColor: '#cfc3b5',
      paddingBottom: 3,
    }}>

        <View style={{ 
            flexDirection: 'row',
            paddingLeft: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
              <Icon name="infinite-outline" size={35} color="#BAE7AF" />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: '700',
                  paddingLeft: 5,
                }}
              >{title}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
            }}>
                <TouchableOpacity>
                  <Icon name="notifications-outline" size={25} color="#BAE7AF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingLeft: 10,
                }}>
                  <Icon name="gift-outline" size={25} color="#BAE7AF" />
                </TouchableOpacity>
            </View>
        </View>
      </View>
  );
}

const leftHeader = (title) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }}>
      <Icon name="square" size={45} color="#BAE7AF" />
      <Text
        style={{
          fontSize: 25,
          fontWeight: '700',
          paddingLeft: 5,
        }}
      >Premium</Text>
    </View>
  );
};

const rightHeader = () => {
  return (
    <>
      <TouchableOpacity>
        <Icon name="search" size={25} color="#BAE7AF" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="gift" size={25} color="#BAE7AF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingLeft: 10,
      }}>
        <Icon name="person" size={25} color="#BAE7AF" />
      </TouchableOpacity>
    </>
  );
};


const FirstStack = createNativeStackNavigator();
const FirstScreenNavigator = () => {
    return(
      <FirstStack.Navigator>
        <FirstStack.Screen 
        name="추천" 
        component={RecommandScreen} 
        options={{
          title: '',
          header: () => StackHeader('추천'),
        }}
        />
      </FirstStack.Navigator>
    );
}
export {FirstScreenNavigator}

const SecondStack = createNativeStackNavigator();
const SecondScreenNavigator = () => {
  return(
    <SecondStack.Navigator>
      <SecondStack.Screen 
        name="기록" 
        component={HistoryScreen}
        options={{
          title: '',
          header: () => StackHeader('기록'),
        }}
        />
    </SecondStack.Navigator>
  );
}
export {SecondScreenNavigator}

const ThirdStack_Main = createNativeStackNavigator();
const ThirdScreenNavigator_Main = () => {
  return(
    <ThirdStack_Main.Navigator>
      <ThirdStack_Main.Screen 
        name="S_Main"
        component={PartyScreen_Main}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <ThirdStack_Main.Screen 
        name="S_MainWriting"
        component={PartyScreen_MainWriting}
        options={{
          title: '',
          headerShown: true,
          headerBackButtonMenuEnabled : true,
        }}
        />
      <ThirdStack_Main.Screen 
        name="S_MainShow"
        component={PartyScreen_MainShow}
        options={{
          title: '',
          headerShown: true,
          unmountOnBlur: true,
          headerBackButtonMenuEnabled : true,
        }}
      />
    </ThirdStack_Main.Navigator>
  );
}

const ThirdStack_Sub = createNativeStackNavigator();
const ThirdScreenNavigator_Sub = () => {
  return(
    <ThirdStack_Sub.Navigator>
      <ThirdStack_Sub.Screen
        name="S_Sub"
        component={PartyScreen_Sub}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <ThirdStack_Sub.Screen name="S_SubWriting"   component={PartyScreen_SubWriting} />
      <ThirdStack_Sub.Screen name="S_SubShow"      component={PartyScreen_SubShow} />
      <ThirdStack_Sub.Screen 
        name="MyParty"
        component={TopTabView_My} 
        options={{
          headerShown: false,
        }}
      />
    </ThirdStack_Sub.Navigator>
  );
}

// <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
const Tab = createMaterialTopTabNavigator();
const TopTabView = () => {
  return (
    <Tab.Navigator 
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        tabBarStyle : {display: 'flex'},
        tabBarVisible : false,
      }}
    >
      <Tab.Screen name="Main" component={ThirdScreenNavigator_Main} />
      <Tab.Screen name="Sub" component={ThirdScreenNavigator_Sub} />
    </Tab.Navigator>
  );
}
export {TopTabView}

import useStore from './AppContext';

function MyTabBar({ state, descriptors, navigation, position }) {


  //console.log('@my', navigation.getState());

  const dp = useStore(state => state.hideTabBar);

  if (dp) {
    return(<></>);
  }


  return (
    <View style={{
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderColor: '#cfc3b5',
      paddingBottom: 3,
      }}
    >

        <View style={{ 
            flexDirection: 'row',
            paddingLeft: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
              <Icon name="infinite-outline" size={35} color="#BAE7AF" />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: '700',
                  paddingLeft: 5,
                }}
              >Premium</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
            }}>
                <TouchableOpacity>
                  <Icon name="notifications-outline" size={25} color="#BAE7AF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingLeft: 10,
                }}>
                  <Icon name="gift-outline" size={25} color="#BAE7AF" />
                </TouchableOpacity>
            </View>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{ 
              flexDirection: 'row', 
              //width: "80%",
              padding: 5,
              justifyContent: 'flex-start',
              alignItems: 'center',
          }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                const onLongPress = () => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  });
                };
                // modify inputRange for custom behavior
                const inputRange = state.routes.map((_, i) => i);

                /*const opacity = animation.interpolate(position, {
                  inputRange: inputRange,
                  outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                });*/

                const color = isFocused ? "black" : "#cfc3b5";

                return (
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ 
                      paddingLeft: 5,
                      paddingRight: 15,
                    }}
                    key={route.name}
                  >
                    <Text style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: color,
                    }}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{
            marginRight: 10,
          }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyParty")}
            >
              <Icon name="md-albums-outline" size={30} color="#BAE7AF" />
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const Tab_My = createMaterialTopTabNavigator();
const TopTabView_My = () => {
  return (
    <Tab_My.Navigator 
      tabBar={(props) => <MyTabBar_My {...props} />}
      screenOptions={{
        tabBarStyle : {display: 'none'},
        swipeEnabled: true,
      }}
      swipe
    >
      <Tab_My.Screen name="Party_My1" component={PartyScreen_My} />
      <Tab_My.Screen name="Party_Add1" component={PartyScreen_Add} />
      <Tab_My.Screen name="Party_Attend1" component={PartyScreen_Attend} />
    </Tab_My.Navigator>
  );
}

function MyTabBar_My({ state, descriptors, navigation, position }) {

  React.useLayoutEffect(() => {
    console.log('@mymy', navigation.getState().routeNames);
  }, []);

  return (
    <View style={{
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderColor: '#cfc3b5',
      paddingBottom: 3,
      }}
    >
        <View style={{ 
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
          }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                const onLongPress = () => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  });
                };
                // modify inputRange for custom behavior
                const inputRange = state.routes.map((_, i) => i);

                /*const opacity = animation.interpolate(position, {
                  inputRange: inputRange,
                  outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                });*/

                const color = isFocused ? "black" : "#cfc3b5";

                return (
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ 
                      paddingLeft: 5,
                      paddingRight: 15,
                    }}
                    key={route.name}
                  >
                    <Text style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: color,
                    }}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
    </View>
  );
}


const FifthStack = createNativeStackNavigator();
const FifthScreenNavigator = () => {
  return(
    <FifthStack.Navigator>
      <FifthStack.Screen 
        name="프로필" 
        component={RateProfileScreen}
        options={{
          title: '',
          header: () => StackHeader('프로필'),
        }}
      />
    </FifthStack.Navigator>
  );
}
export {FifthScreenNavigator}

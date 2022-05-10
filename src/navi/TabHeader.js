import * as React from 'react';
import { Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export const StackHeader = (title) => {
  const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
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
                    color: isDarkMode ? Colors.white : Colors.black,
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

export const TopTabHeader = ({ state, descriptors, navigation, position }) => {

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
              >파티</Text>
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
              onPress={() => navigation.getParent().getParent().navigate('PartyNavigator', {screen: 'MyParty'})}
            >
              <Icon name="md-albums-outline" size={30} color="#BAE7AF" />
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}


export const TopTabHeader_MY = ({ state, descriptors, navigation, position }) => {

  const routeName = ['내 파티','참여한 파티','찜한 파티'];
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
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{ 
              flexDirection: 'row', 
              //width: "80%",
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
          }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    //: route.name;
                    : routeName[index];
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
    </View>
  );
}
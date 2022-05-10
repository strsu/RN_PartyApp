import * as React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={initStyles.container}>
      <Button
        title="울림 시작하기"
        onPress={() => Alert.alert("두둥")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function registerScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const initStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  }
});

export default registerScreen;
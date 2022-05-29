import * as React from 'react';
import { StyleSheet, useColorScheme, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import useStore, {useChat, useBadge} from './AppContext';

import InitComponent from './src/init/InitComponent';
import ContentNavigator from './src/navi/contentNavi';
import RegisterNavigator from './src/navi/registerNavi';
import LoginComponent from './src/init/LoginComponent';
import PartyNavigator from './src/navi/partyNavi';
import { AuthScreenNavigator } from './src/navi/authNavi';

import { db } from './database';

const Stack = createNativeStackNavigator();

function App(props) {
  
  const isDarkMode = useColorScheme() === 'dark';
  const setIsDarkMode = useStore((state) => state.setIsDarkMode);
  setIsDarkMode(isDarkMode);

  React.useEffect(() => {
    createTable();
    getData();

  }, []);


  React.useEffect(() => {
    // 앱이 켜져있을 때 fcm 이 날라오면
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      let data = JSON.stringify(remoteMessage.notification.title);
      console.log('@App.js -> ', data);
      if(data.includes('라운지')) {
        useBadge.getState().setAnonyIncrease(1);
      }
    });

    return unsubscribe;
  }, []);
  
  const chatQuery = `CREATE TABLE IF NOT EXISTS userChat (
                    _own CHAR(1) NOT NULL,
                    _to VARCHAR(20) NOT NULL,
                    _date CHAR(23) NOT NULL,
                    _content TEXT NOT NULL
                  );`;

  const createTable = () => {

    /*db.transaction(txn => {
      txn.executeSql(
        'Drop table userChat', 
        [], 
        (txn, res) => {
          console.log('create table successfully');
        },
        (error) => {
          console.log('fail to create table', error);
        }
      );
    });*/

    db.transaction(txn => {
      txn.executeSql(
        chatQuery, 
        [], 
        (txn, res) => {
          console.log('create table successfully');
        },
        (error) => {
          console.log('fail to create table', error);
        }
      );
    });
  }

  const getData = () => {

    db.transaction((tx) => {
      tx.executeSql(
          "SELECT * FROM userChat ORDER BY _to, _date;",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              conversation = {};
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                let to = row._to;
                if(!useChat.getState().userList.includes(to)) {
                  useChat.getState().appendUser(to);
                }
                if(conversation[to] === undefined) conversation[to] = [];
                conversation[to].push({own: row._own, stamp: row._date, text: row._content});
              }
              //console.log(conversation);
              useChat.getState().setConversation(conversation);
            }
          },
          (error) => {
            console.log("fail to fetch data from database");
          }
      )
    });
  }



  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName= 'InitComponent'
      >
        <Stack.Screen 
          name="InitComponent"
          component={InitComponent}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="RegisterNavigator"
          component={RegisterNavigator}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Login"
          component={LoginComponent}
          options={{
            title: '',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="contentNavi"
          component={ContentNavigator}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="PartyNavigator"
          component={PartyNavigator}
          options={{
            title: '',
            //headerBackButtonMenuEnabled : true,
          }}
        />
        <Stack.Screen 
          name="AuthScreen"
          component={AuthScreenNavigator}
          options={{
            title: '',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
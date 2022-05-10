/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import {useChat} from './AppContext';

//AppRegistry.registerComponent(appName, () => App);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const msg = remoteMessage.notification;
  let date = new Date(remoteMessage.sentTime);
  let stamp = date.getFullYear()+
          "-"+parseInt((date.getMonth()+1)).toString().padStart(2, '0')+
          "-"+parseInt(date.getDate()).toString().padStart(2, '0')+
          " "+parseInt(date.getHours()).toString().padStart(2, '0')+
          ":"+parseInt(date.getMinutes()).toString().padStart(2, '0')+
          ":"+parseInt(date.getSeconds()).toString().padStart(2, '0')+
          "."+parseInt(date.getMilliseconds());

  if(msg.body.includes('채팅')) {
    useChat.getState().putDB(0, msg.title, stamp, msg.body.substring(4));
  }
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);



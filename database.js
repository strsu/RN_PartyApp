import {openDatabase} from 'react-native-sqlite-storage';

export const baseURL = 'http://192.168.1.243:4000/';
//export const baseURL = 'http://3.36.205.23:5000/';

export const db = openDatabase({name: 'ullimDB', location: 'default'});


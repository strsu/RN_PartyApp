/*import React from 'react';

const AppContext = React.createContext();

export default AppContext;*/

import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'
import XMPP from 'react-native-xmpp';
import { getCurTime } from './Screen/util/getCurTime';
import { db } from './database';
import { customAxios } from './src/customAxios';
import axios from 'axios';
import { Alert } from 'react-native';

// set 함수를 통해서만 상태를 변경할 수 있다
const useStore = create(set => ({
  chatid: '',
  uuid: '',
  sex: '',
  grade: '',
  mainPic: '',
  accessToken: '',
  refreshToken: '',
  firebaseToken: '',
  picURL: 'http://192.168.1.243:4001/media/image/?imageName=',
  nickname: '',
  isDarkMode: false,
  setIsDarkMode: (val) => set((state) => ({ isDarkMode: val })),
  setUUID: (val) => set((state) => ({ uuid: val })),
  setSEX: (val) => set((state) => ({ sex: val })),
  setGRADE: (val) => set((state) => ({ grade: val })),
  setMainPic: (val) => set((state) => ({ mainPic: val })),
  setNickName: (val) => set((state) => ({ nickname: val })),
  setAccessToken: (val) => set((state) => ({ accessToken: val })),
  setFireBaseToken: (val) => set((state) => ({ firebaseToken: val })),

}));
export default useStore;

export const useBadge = create((set, get) => ({
  anony: 0,
  chat: 0,

  setAnonyIncrease: (val) => set((state) => ({ anony: state.anony + val })),
  setAnonyDecrease: (val) => set((state) => ({ anony: state.anony - val })),
  setChatIncrease: (val) => set((state) => ({ chat: state.chat + val })),
  setChatDecrease: (val) => set((state) => ({ chat: state.chat - val })),

}));

export const useChat = create((set, get) => ({
  userID: '',
  userPW: '123123',
  userList: [],
  logged: false,
  loading: false,
  loginError: null,
  error: null,
  conversation: {},
  setID: (val) => set(state => ({ userID: val })),
  setLogged: (val) => set(state => ({ logged: val })),
  setLoading: (val) => set(state => ({ loading: val })),
  setLoginError: (val) => set(state => ({ loginError: val })),
  setError: (val) => set(state => ({ error: val })),
  setConversation: (val) => set(state => ({ conversation: val })),
  appendUser: (val) => set(state => ({ userList: state.userList.concat(val) })),

  onLoginError: () => set({
    loading: false,
    //conversation: {},
    loginError: "Cannot authenticate, please use correct local username"
  }),

  onError: (message) => set(state => {
    error = message;
  }),

  onDisconnect: (message) => set({
    logged: false,
    loginError: message,
  }),

  onLogin: () => {
    set({
      //conversation: {},
      loading: false,
      loginError: null,
      logged: true,
    });
  },

  makeRoom: (info) => {
    // 채팅방 개설
    if (!useChat.getState().userList.includes(info.id)) {
      useChat.getState().appendUser(info.id);
    }
  },

  sendMessage: (message, from, to) => {
    if (!to || !to.trim() || to == null || from == null) {
      console.error("No to username is defined");
      return false;
    }
    if (!message || !message.trim()) {
      return false;
    }

    const to_ = to.match(/^([^@]*)@/)[1];
    const from_ = from.match(/^([^@]*)@/)[1];

    if (!useChat.getState().userList.includes(to_)) {
      useChat.getState().appendUser(to_);
    }

    let stamp = getCurTime();

    let conversation = useChat.getState().conversation;
    if (conversation[to_] === undefined) conversation[to_] = [];
    conversation[to_].push({ own: '1', text: message.trim(), stamp: stamp });

    useChat.getState().setConversation(conversation);
    useChat.getState().setError(null);

    JSON.stringify

    const json = {
      user: to_,
      host: 'localhost'
    }

    axios.post('http://192.168.1.243:5280/api/user_resources', JSON.stringify(json))
      .then((res) => {
        // 0이면 오프라인
        if(res.data.length == 0) {
          customAxios.post('/Push/sendMsg/', {
            from: from_,
            to: to_,
            msg: message.trim()
          })
            .then((res) => {
            }).catch((err) => {
            })
        } else {
          XMPP.message(message.trim(), to);
        }
      }).catch((err) => {
        console.log('err', err);
      })
    useChat.getState().putDB(1, to_, stamp, message);
  },

  onReceiveMessage: (msg) => {
    let body = JSON.stringify(msg.body);
    let from = JSON.stringify(msg.from);

    let src = JSON.stringify(msg.src);
    let stamp = getCurTime();

    if (body != 'null' && from != null) {
      if (src.includes("<delay xmlns='urn:xmpp:delay' stamp='")) {
        stamp = src.split("<delay xmlns='urn:xmpp:delay' stamp='")[1].split("+00:00")[0].replace('T', ' ');
      }

      body = body.slice(1, body.length - 1);
      from = from.match(/^([^@]*)@/)[1].slice(1);

      if (!useChat.getState().userList.includes(from)) {
        useChat.getState().appendUser(from);
      }
      let conversation = useChat.getState().conversation;
      if (conversation[from] === undefined) conversation[from] = [];
      conversation[from].push({ own: '0', text: body, stamp: stamp });
      useChat.getState().setConversation(conversation);
      useChat.getState().putDB(0, from, stamp, body);
    }
  },

  login: () => {
    local = useChat.getState().userID;
    if (!local || !local.trim()) {
      useChat.getState().setLoginError("Local username should not be empty");
    } else {
      useChat.getState().setLoginError(null);
      // try to login to test domain with the same password as username
      const url = '192.168.1.243';
      //const url = '3.36.205.23';
      XMPP.trustHosts([url]);
      console.log(useChat.getState().userID, useChat.getState().userPW, url);
      XMPP.connect(useChat.getState().userID, useChat.getState().userPW, url);
      useChat.getState().setLoading(true);
    }
  },

  disconnect: () => {
    XMPP.disconnect();
  },

  putDB: (_own, _to, _date, _content) => {

    const chatQuery = `INSERT INTO 
    userChat ( _own, _to, _date, _content ) 
    VALUES ('${_own}', '${_to}', '${_date}', '${_content}');`;

    db.transaction(txn => {
      txn.executeSql(
        chatQuery,
        [],
        (txn, res) => {
          //console.log('@@@', chatQuery);
        },
        (error) => {
          console.log('fail to INSERT', error);
        }
      );
    });
  },

}));

export const useAnony = create((set, get) => ({
  Filter: [],
  curFilter: '종합',
  send: false,
  commentText: '',
  setFilter: (data) => set(state => ({ Filter: data })),
  setCurFilter: (name) => set(state => ({ curFilter: name })),
  setSend: () => set(state => ({ send: !state.send })),
  setCommentText: (text) => set(state => ({ commentText: text })),
  getCommentText: get.commentText,
}));


export const useRegister = create((set, get) => ({
  email: '',
  password: '',
  passwordConf: '',
  name: '홍길동',
  birth: '',
  nickname: '',
  edu: '',
  eduName: '',
  region: '',
  height: '',
  body: '',
  religion: '',
  smoke: '',
  drinking: '',
  character: '',
  introduce: '',
  mainPic: '',
  requirePic: ['', ''],
  extraPic: ['', '', ''],
  phone: '010-1234-5678',
  birth: '123456',
  sex: '0',

  registerFinish: false,
  authFinish: false,

  setEmail: (val) => set(state => ({ email: val })),
  setPassword: (val) => set(state => ({ password: val })),
  setPasswordConf: (val) => set(state => ({ passwordConf: val })),
  setName: (val) => set(state => ({ name: val })),
  setBirth: (val) => set(state => ({ birth: val })),
  setNickname: (val) => set(state => ({ nickname: val })),
  setEdu: (val) => set(state => ({ edu: val })),
  setEduName: (val) => set(state => ({ eduName: val })),
  setRegion: (val) => set(state => ({ region: val })),
  setHeight: (val) => set(state => ({ height: val })),
  setBody: (val) => set(state => ({ body: val })),
  setReligion: (val) => set(state => ({ religion: val })),
  setSmoke: (val) => set(state => ({ smoke: val })),
  setDrinking: (val) => set(state => ({ drinking: val })),
  setCharacter: (val) => set(state => ({ character: val })),
  setIntroduce: (val) => set(state => ({ introduce: val })),
  setMainPic: (val) => set(state => ({ mainPic: val })),
  setRequirePic: (val) => set(state => ({ requirePic: val })),
  setExtraPic: (val) => set(state => ({ extraPic: val })),
  setPhone: (val) => set(state => ({ phone: val })),
  setBirth: (val) => set(state => ({ birth: val })),
  setSex: (val) => set(state => ({ sex: val })),

  setRegisterFinish: (val) => set(state => ({ registerFinish: val })),
  setAuthFinish: (val) => set(state => ({ authFinish: val })),


  setInit: () => set(state => ({
    email: '',
    password: '',
    passwordConf: '',
    name: '',
    birth: '',
    nickname: '',
    edu: '',
    eduName: '',
    region: '',
    height: '',
    body: '',
    religion: '',
    smoke: '',
    drinking: '',
    character: '',
    introduce: '',
    mainPic: '',
    requirePic: ['', ''],
    extraPic: ['', '', ''],
    phone: '',
    birth: '',
    sex: '',
  })),

  doRegister: () => {
    let json = {
      email: get().email,
      password: get().password,
      name: get().name,
      birth: get().birth,
      nickname: get().nickname,
      edu: get().edu,
      eduName: get().eduName,
      region: get().region,
      height: get().height,
      body: get().body,
      religion: get().religion,
      smoke: get().smoke,
      drinking: get().drinking,
      //character: get().character,
      //introduce: get().introduce,
      mainPic: get().mainPic,
      requirePic: get().requirePic,
      extraPic: get().extraPic,
      phone: get().phone.replace(/-/g, ''),
      birth: get().birth,
      sex: get().sex
    }
    console.log(json);
    customAxios.post('/Auth/register/', json)
      .then((res) => {
        useRegister.getState().setInit();
        useStore.getState().setGRADE('N');
        useStore.getState().setSEX(get().sex);
        //customAxios.defaults.headers.uuid = res.data;
        set(state => ({ registerFinish: true }))
      }).catch((err) => {
        set(state => ({ registerFinish: false }))
      })
  },

}));


export const useAuth = create(subscribeWithSelector((set, get) => ({
  mainPic: '',  // 메인사진
  requirePic: '', // 필수사진
  extraPic: '', // 추가사진
  professional: '', // 전문직
  businessman: '',  // 사업가
  highSalary: '', // 고액연봉
  a100million: '',  // 억대연봉
  gangnamAPT: '', // 강남거주
  expensiveAPT: '', // 고가 아파트
  foreignCar: '', // 외제차
  superCar: '', // 슈퍼카
  highAsset: '',  // 고액 자산
  ultraHighAsset: '', // 초고액 자산
  eliteFamily: '',  // 엘리트 집안
  highCaliberFamily: '',  // 제력가 집안
  prestigiousUniv: '',  // 명문대
  aboardPrestigiousUniv: '',  // 해외 명문대
  height: '', // 키인증

  isReturnedMainPic: '',  // 메인사진
  isReturnedRequirePic: '', // 필수사진
  isReturnedExtraPic: '', // 추가사진
  isReturnedProfessional: '', // 전문직
  isReturnedBusinessman: '',  // 사업가
  isReturnedHighSalary: '', // 고액연봉
  isReturnedA100million: '',  // 억대연봉
  isReturnedGangnamAPT: '', // 강남거주
  isReturnedExpensiveAPT: '', // 고가 아파트
  isReturnedForeignCar: '', // 외제차
  isReturnedSuperCar: '', // 슈퍼카
  isReturnedHighAsset: '',  // 고액 자산
  isReturnedUltraHighAsset: '', // 초고액 자산
  isReturnedEliteFamily: '',  // 엘리트 집안
  isReturnedHighCaliberFamily: '',  // 제력가 집안
  isReturnedPrestigiousUniv: '',  // 명문대
  isReturnedAboardPrestigiousUniv: '',  // 해외 명문대
  isReturnedHeight: '', // 키인증

  isJudging: false, // 평가중인지?
  isPass: false, // 평가완료, 통과

  setMainPic: (val) => set(state => ({ mainPic: val })),
  setRequirePic: (val) => set(state => ({ requirePic: val })),
  setExtraPic: (val) => set(state => ({ extraPic: val })),
  setProfessional: (val) => set(state => ({ professional: val })),
  setBusinessman: (val) => set(state => ({ businessman: val })),
  setHighSalary: (val) => set(state => ({ highSalary: val })),
  setA100million: (val) => set(state => ({ a100million: val })),
  setGangnamAPT: (val) => set(state => ({ gangnamAPT: val })),
  setExpensiveAPT: (val) => set(state => ({ expensiveAPT: val })),
  setForeignCar: (val) => set(state => ({ foreignCar: val })),
  setSuperCar: (val) => set(state => ({ superCar: val })),
  setHighAsset: (val) => set(state => ({ highAsset: val })),
  setUltraHighAsset: (val) => set(state => ({ ultraHighAsset: val })),
  setEliteFamily: (val) => set(state => ({ eliteFamily: val })),
  setHighCaliberFamily: (val) => set(state => ({ highCaliberFamily: val })),
  setPrestigiousUniv: (val) => set(state => ({ prestigiousUniv: val })),
  setAboardPrestigiousUniv: (val) => set(state => ({ aboardPrestigiousUniv: val })),
  setHeight: (val) => set(state => ({ height: val })),

  setIsReturnedMainPic: (val) => set({ isReturnedMainPic : val}),
  setIsReturnedRequirePic: (val) => set({ isReturnedRequirePic : val}),
  setIsReturnedExtraPic: (val) => set({ isReturnedExtraPic : val}),
  setIsReturnedProfessional: (val) => set({ isReturnedProfessional : val}),
  setIsReturnedBusinessman: (val) => set({ isReturnedBusinessman : val}),
  setIsReturnedHighSalary: (val) => set({ isReturnedHighSalary : val}),
  setIsReturnedA100million: (val) => set({ isReturnedA100million : val}),
  setIsReturnedGangnamAPT: (val) => set({ isReturnedGangnamAPT : val}),
  setIsReturnedExpensiveAPT: (val) => set({ isReturnedExpensiveAPT : val}),
  setIsReturnedForeignCar: (val) => set({ isReturnedForeignCar : val}),
  setIsReturnedSuperCar: (val) => set({ isReturnedSuperCar : val}),
  setIsReturnedHighAsset: (val) => set({ isReturnedHighAsset : val}),
  setIsReturnedUltraHighAsset: (val) => set({ isReturnedUltraHighAsset : val}),
  setIsReturnedEliteFamily: (val) => set({ isReturnedEliteFamily : val}),
  setIsReturnedHighCaliberFamily: (val) => set({ isReturnedHighCaliberFamily : val}),
  setIsReturnedPrestigiousUniv: (val) => set({ isReturnedPrestigiousUniv : val}),
  setIsReturnedAboardPrestigiousUniv: (val) => set({ isReturnedAboardPrestigiousUniv : val}),
  setIsReturnedHeight: (val) => set({ isReturnedHeight : val}),

  setIsJudging: (val) => set({ isJudging : val}),
  setIsPass: (val) => set({ isPass : val}),


  verify() {  // 인증요청 전 검증
    if(get().isJudging) {
      Alert.alert(
        "알림",
        '현재 심사를 진행중입니다.',
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      return false;
    }
    
    let isPicOkay = false;
    let isAlphaOkay = false;
    if (get().mainPic != '' && get().requirePic != '') {
      if (get().requirePic[0] != '' && get().requirePic[1] != '') isPicOkay = true;
      else {
        Alert.alert(
          "알림",
          '필수사진 2장을 올려주셔야 합니다.',
          [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
        return false;
      }
    } else {
      Alert.alert(
        "알림",
        '메인사진 1장과 필수사진 2장을 올려주셔야 합니다.',
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      return false;
    }

    if (get().professional != '') isAlphaOkay = true;
    if (get().businessman != '') isAlphaOkay = true;
    if (get().highSalary != '') isAlphaOkay = true;
    if (get().a100million != '') isAlphaOkay = true;
    if (get().gangnamAPT != '') isAlphaOkay = true;
    if (get().expensiveAPT != '') isAlphaOkay = true;
    if (get().foreignCar != '') isAlphaOkay = true;
    if (get().superCar != '') isAlphaOkay = true;
    if (get().highAsset != '') isAlphaOkay = true;
    if (get().ultraHighAsset != '') isAlphaOkay = true;
    if (get().highCaliberFamily != '') isAlphaOkay = true;
    if (get().prestigiousUniv != '') isAlphaOkay = true;
    if (get().prestigiousUniv != '') isAlphaOkay = true;
    if (get().aboardPrestigiousUniv != '') isAlphaOkay = true;
    if (get().height != '') isAlphaOkay = true;


    if (useStore.getState().sex == 'M') { // 남자
      if (isPicOkay && isAlphaOkay) get().upload(); // 남자는 프로필 + a 인증 필요
      else {
        Alert.alert(
          "알림",
          '1가지 이상의 서류를 등록하셔야 합니다.',
          [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
          return false;
      }
    } else {
      if (isPicOkay || isAlphaOkay) get().upload(); // 여자는 외모 서류 중 택 1 가능
      else return false;
    }
  },

  fetch() {
    customAxios.get('/Auth/badge/')
      .then((res) => {
        let returnCnt = 0;
        let confirmCnt = 0;

        if(res.data.length == 0) {
          set({
            isJudging: false,
          }); 
        } else {
          set({
            isJudging: true,
          }); 
        }

        res.data.map(params => {
          let pic = params.ual_image.replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',');
          if(params.ual_type != 'mainPic' && params.ual_type != 'requirePic') {
            if(pic.length == 1) pic = pic.concat(['','']);
            else if(pic.length == 2) pic = pic.concat(['']);
          }
          
          // 반려된게 있다면 심사도 종료, 
          if(params.ual_return != '') {
            returnCnt += 1; // 반려 개수를 카운트
          }

          if(params.ual_confirm != '') {
            confirmCnt += 1; // 심사통과 개수 카운트
          }

          switch(params.ual_type) {
            case 'mainPic': {
              set({
                mainPic: pic,
                isReturnedMainPic: params.ual_return,
              }); 
              break;
            }
            case 'requirePic': {
              set({
                requirePic: pic,
                isReturnedRequirePic: params.ual_return,
              }); 
              break;
            }
            case 'extraPic': {
              set({
                extraPic: pic,
                isReturnedExtraPic: params.ual_return,
              }); 
              break;
            }
            case 'professional': {
              set({
                professional: pic,
                isReturnedProfessional: params.ual_return,
              }); 
              break;
            }
            case 'businessman': {
              set({
                businessman: pic,
                isReturnedBusinessman: params.ual_return,
              }); 
              break;
            }
            case 'highSalary': {
              set({
                highSalary: pic,
                isReturnedHighSalary: params.ual_return,
              }); 
              break;
            }
            case 'a100million': {
              set({
                a100million: pic,
                isReturnedA100million: params.ual_return,
              }); 
              break;
            }
            case 'gangnamAPT': {
              set({
                gangnamAPT: pic,
                isReturnedGangnamAPT: params.ual_return,
              }); 
              break;
            }
            case 'expensiveAPT': {
              set({
                expensiveAPT: pic,
                isReturnedExpensiveAPT: params.ual_return,
              }); 
              break;
            }
            case 'foreignCar': {
              set({
                foreignCar: pic,
                isReturnedForeignCar: params.ual_return,
              }); 
              break;
            }
            case 'superCar': {
              set({
                superCar: pic,
                isReturnedSuperCar: params.ual_return,
              }); 
              break;
            }
            case 'highAsset': {
              set({
                highAsset: pic,
                isReturnedHighAsset: params.ual_return,
              }); 
              break;
            }
            case 'ultraHighAsset': {
              set({
                ultraHighAsset: pic,
                isReturnedUltraHighAsset: params.ual_return,
              }); 
              break;
            }
            case 'eliteFamily': {
              set({
                eliteFamily: pic,
                isReturnedUltraEliteFamily: params.ual_return,
              }); 
              break;
            }
            case 'highCaliberFamily': {
              set({
                highCaliberFamily: pic,
                isReturnedHighCaliberFamily: params.ual_return,
              }); 
              break;
            }
            case 'prestigiousUniv': {
              set({
                prestigiousUniv: pic,
                isReturnedPrestigiousUniv: params.ual_return,
              }); 
              break;
            }
            case 'aboardPrestigiousUniv': {
              set({
                aboardPrestigiousUniv: pic,
                isReturnedAboardPrestigiousUniv: params.ual_return,
              }); 
              break;
            }
            case 'height': {
              set({
                height: pic,
                isReturnedHeight: params.ual_return,
              }); 
              break;
            }
          }

          if(returnCnt == 0 && confirmCnt == 0) {
            // 심사중
            set({
              isJudging: true,
              isPass: false,
            }); 
          } else if(returnCnt == 0 && confirmCnt != 0) {
            // 심사완료, 통과
            set({
              isJudging: false,
              isPass: true,
            }); 
          } else {
            // 심사완료, 불통
            set({
              isJudging: false,
              isPass: false,
            }); 
          }

        });
      }).catch((err) => {
        return false
      })
  },

  upload() {
    let json = {
      mainPic: get().mainPic,
      requirePic: get().requirePic,
      extraPic: get().extraPic,
      professional: get().professional,
      businessman: get().businessman,
      highSalary: get().highSalary,
      a100million: get().a100million,
      gangnamAPT: get().gangnamAPT,
      expensiveAPT: get().expensiveAPT,
      foreignCar: get().foreignCar,
      superCar: get().superCar,
      highAsset: get().highAsset,
      ultraHighAsset: get().ultraHighAsset,
      eliteFamily: get().eliteFamily,
      highCaliberFamily: get().highCaliberFamily,
      prestigiousUniv: get().prestigiousUniv,
      aboardPrestigiousUniv: get().aboardPrestigiousUniv,
      height: get().height,
    }

    customAxios.post('/Auth/badge/', json)
      .then((res) => {
        return true
      }).catch((err) => {
        return false
      })
  }


})));

/*
'mainPic': '',
'requirePic': '',
'extraPic': '',
'professional': '',
'businessman': '',
'highSalary': '',
'a100million': '',
'gangnamAPT': '',
'expensiveAPT': '',
'foreignCar': '',
'SuperCar': '',
'HighAsset': '',
'ultraHighAsset': '',
'eliteFamily': '',
'highCaliberFamily': '',
'prestigiousUniv': '',
'aboardPrestigiousUniv': '',
'height': ''
*/

export const useUserParty = create(subscribeWithSelector((set, get) => ({
  partyData: [],
  filterData: [],
  curFilter: ['종합'],
  mSex: true,
  wSex: true,
  startDay: '',
  endDay: '',

  setPartyData: (val) => set({ partyData: val }),
  setFilterData: (val) => set({ filterData: val }),
  //setCurFilter: (val) => set(state => ({ curFilter: state.curFilter.concat(val) })),
  setCurFilter: (val) => set({ curFilter: val }),
  setMSex: (val) => set({mSex: val}),
  setWSex: (val) => set({wSex: val}),
  setStartDate: (val) => set({startDay: val}),
  setEndDate: (val) => set({endDay: val}),
  initCurFilter: () => set({
      curFilter: ['종합'],
      mSex: true,
      wSex: true,
      date: '',
      startDay: '',
      endDay: '',
    }),
})));
# reactApp
 
## ※채팅

client: React Native
WAS: Django
XMPP: ejabberd

### #동작 화면
![chatting](https://user-images.githubusercontent.com/25381921/167542361-3375ef02-fdfb-4403-88b9-97ea23838586.gif)

보이는 화면은 실시간 채팅 및 FCM을 이용한 Push 알림 기능을 보여줍니다.

### #동작 방식
![chatting](https://user-images.githubusercontent.com/25381921/167542366-88809745-6e4b-41b4-aeec-5763de1d0165.png)

사용자의 온라인/오프라인 상태에 따라 동작 방식이 나뉘어 집니다.

Why? 상대방의 온라인 여부를 판단하는 이유  
->   
ejabberd는 상대방이 오프라인인 경우 자체 DB에 저장후 상대방이 로그인시 메시지를 보내주는 역할을 하게됩니다.  
그러나 채팅은 Push를 통해 실시간으로 전달 될 필요가 있기 때문에 상대방이 오프라인인 경우에는 ejabberd의 DB에 저장했다가 상대방이 로그인 했을 때 메시지를 보내는 것 보다는
FCM을 이용해서 Push를 보내는 동시에, App의 BackGround에서 MSG를 저장하는 방식이 '서버 부하/메시지 누락'의 이슈를 예방할 수 있을 것이라 생각해서 다음과 같은 방식으로 메시지를 전달하게 됩니다.

즉,  
온라인시 ejabberd를 이용해 실시간 통신  
오프라인시 FCM을 이용해 Push + Data 전송


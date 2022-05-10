# reactApp

## ※프로젝트 개요  
본 프로젝트는 사람들이 만나서 자유롭게 놀 수 있는 환경을 제공하는 것을 목표로 제작하게 되었습니다.  
때문에 기존에 존재하는 1:1 소개팅 / 소모임 등의 어플을 참고해서 두 분야를 어우를 수 있는 어플을 제작하자는 목적을 지녔습니다.
또한, 단순히 사람들이 자유롭게 모임을 만드는 것에 그치지 않고, 앱 자체적으로 모임을 주도함으로써 앱을 더 활성화 하도록 할 것입니다.

## 사용 기술
AOS/IOS: React Native > 0.6   
WebServer: Nginx  
WAS: Django  
Auth: JWT  
Chat: XMPP -> ejabberd  

### #About React Native
1. 디자인 패턴  
Component-Presenter 디자인 패던을 사용하였습니다.  
여러 디자인 패턴 중에 Component-Presenter 디자인 패턴을 선택한 이유는 0.6이상에서 RN은 코딩 스타일을 Function과 Class중에 선택할 수 있습니다.  
RN을 처음사용하면서 Function / Class 각각이 지닌 장단점이 있을 것이라 생각을 했습니다.  
그래서 Component에서는 Class방식을 Presenter에서는 Function방식을 활용해 각 방식에서 부족한 점을 다른 방식에서 메어주고자 했습니다.  
원 디자인 패턴의 정의에 맞게 최대한 Component에서는 연산을 Presenter에서는 UI적인 부분만 관여하도록 하였습니다.
다만, 화면이 다시 포커스되는 시점에 Class방식에서 다시 포커스되는 것을 인식할 방식을 못 찾아서 Function방식에서 사용가능한 useFocus 함수를 이용하는 등의 변수가 있습니다.

## ※파티

### #메인 파티
메인 파티는 앱 관리자가 자체적으로 주도하는 파티입니다. 남녀 각 8명 등의 제한된 인원의 참여자를 신청받아서 관리자 주도하에 마련된 장소에서 만남을 이끌어 가는 파티를 말합니다.

### #유저 파티
유저 파티는 사용자들이 개인적으로 파티를 개최하고 만남서 노는 파티를 말합니다.  
사용자 목적에 따라 1:1 혹은 N:N의 게시글을 올릴 수 있으며, 연결된 사람들끼리 채팅을 통해 만남을 이어갈 수 있습니다.

## ※익명 게시판
익명 게시판은 다양한 주제로 사용자들이 소통할 수 있는 하나의 사이버 공간입니다.
 
## ※채팅

client: React Native  
WAS: Django  
XMPP: ejabberd  
XMPP Library: https://github.com/aksonov/react-native-xmpp   
XMPP Library 시행착오: https://prup.tistory.com/80 (개인블로그입니다)  

### #동작 화면
![chatting](https://user-images.githubusercontent.com/25381921/167542361-3375ef02-fdfb-4403-88b9-97ea23838586.gif)

보이는 화면은 실시간 채팅 및 FCM을 이용한 Push 알림 기능을 보여줍니다.

### #동작 방식
![chatting](https://user-images.githubusercontent.com/25381921/167542366-88809745-6e4b-41b4-aeec-5763de1d0165.png)

사용자의 온라인/오프라인 상태에 따라 동작 방식이 나뉘어 집니다.

#### Why? 상대방의 온라인 여부를 판단하는 이유  
->   
ejabberd는 상대방이 오프라인인 경우 자체 DB에 저장후 상대방이 로그인시 메시지를 보내주는 역할을 하게됩니다.  
그러나 채팅은 Push를 통해 실시간으로 전달 될 필요가 있기 때문에 상대방이 오프라인인 경우에는 ejabberd의 DB에 저장했다가 상대방이 로그인 했을 때 메시지를 보내는 것 보다는
FCM을 이용해서 Push를 보내는 동시에, App의 BackGround에서 MSG를 저장하는 방식이 '서버 부하/메시지 누락'의 이슈를 예방할 수 있을 것이라 생각해서 다음과 같은 방식으로 메시지를 전달하게 됩니다.

즉,  
온라인시 ejabberd를 이용해 실시간 통신  
오프라인시 FCM을 이용해 Push + Data 전송


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

## ※스크린 스택 구조
![image](https://user-images.githubusercontent.com/25381921/167589467-cd34aa67-b233-4b85-9eae-8f145473577f.png)

### #파티탭 이슈
![녹화_2022_05_10_16_46_10_738](https://user-images.githubusercontent.com/25381921/167576320-7c44ce73-2ab6-478f-a07f-882905dfc675.gif)   
파티탭은 다음과 같이 스와이프를 통해서 화면전환이 가능하다.   

이때, 화면전환을 위해서 RN에서 [Material Top Tabs Navigator](https://reactnavigation.org/docs/material-top-tab-navigator/)를 사용하였는데,  
본 프로젝트의 Top Tab은 Custom Top Tab이다.    
그래서 Navigator를 이용해 Tab의 Option을 아무리 수정해도 CustomTab을 안보이게 처리할 수가 없었다.   
차선책으로 Zustand라는 상태관리 라이브러리를 사용해 스크린에 따라 CustomTab을 활성/비활성 하도록 했을 때, 파티 글을 눌러 게시물을 확인하고 다시 나오면 CustomTab을 그려주는 동작이 늦게 나타나 UX적인 부분에서 만족스럽지 못하다.  
때문에 세부 내용을 볼 수 있는 Stack화면을 Content와 동일한 계층에 놓음으로써 CustomTab을 가리는 방안을 선택하였다.   

![image](https://user-images.githubusercontent.com/25381921/167580335-ea4155b4-474c-4491-9691-52d8058ea297.png)   

#### MaterialTopTabs 제공 CustomTab사용 안하고 각 화면에 Tab을 넣으면
![녹화_2022_05_10_17_09_02_817](https://user-images.githubusercontent.com/25381921/167580756-150b7d1c-944a-417a-84aa-119c62443a26.gif)   
다음과 같이 상단이 고정이 안된다.

결국 두 방식 모두 UX적으로 만족스럽지 못 하다.  

그래서 PartyTab와 PartyStack을 같은 계층에 놓음으로써 Stack이 Tab을 덮어버리는 방식을 취하면 CustomTab을 지우고 그릴 필요가 없어지기 때문에 다음과 같은 다이어그램으로 앱을 제작하 였다.   
<img src = "https://user-images.githubusercontent.com/25381921/167582046-02b5b436-8616-43e3-b223-567bea31454b.png" width="50%">   
이렇게 덮어버리면 UX적으로 부드럽다. 동작도 깔끔하다.   

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


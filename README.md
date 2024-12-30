# CodeVibe

***CodeVibe*** is a learning-focused code review IDE application.  
Users can view real-time updates to code reviews while communicating with study group members through a chat feature.  
<img width="139" alt="CodeVibe Screenshot" src="https://github.com/passion-mansour/passion-mansour-teambeam-frontend/assets/76105226/f8425252-6428-43a6-81aa-6c0774444d17">



## **Our Team**

| Team Member | Role         |
|:-----------:|:------------:|
| Hayoung       | Frontend     |
| Seungho       | Frontend     |
| Seoyeon       | Backend      |
| Kyeongwon     | Backend      |
| Seunghun      | Deployment & Team Leader |



## **Service Architecture**

<img width="728" alt="Service Architecture" src="https://github.com/passion-mansour/passion-mansour-teambeam-frontend/assets/76105226/d17cb7a8-55c5-4940-9c8b-c3ac31aed7ec">



## **Service Flow**

<img width="507" alt="Service Flow" src="https://github.com/passion-mansour/passion-mansour-teambeam-frontend/assets/76105226/abec1b35-1d21-4ad2-a8b2-6782962d5b19">



## **My Contribution**

### **Real-Time Chat**
- Implemented real-time chat functionality using **STOMP WebSocket** communication.
- Designed a familiar messenger layout:
  - Incoming messages appear on the left.
  - Outgoing messages appear on the right.



### **Real-Time Collaborative Code Editor**
- Enabled execution of entered code via a **Run** button, displaying the output.
- Implemented a **Save** button to store written code.
- Used **STOMP WebSocket** to synchronize the host's code changes in real-time with all participants in the room.
- Granted **edit access** exclusively to the room host.
- Developed a **room destruction feature**:
  - When the host ends the session, the room is marked as closed.
  - Participants are forcibly removed from the room.



CodeVibe empowers collaborative learning through seamless integration of real-time chat and code review, enhancing both productivity and engagement.


---

# CodeVibe
***CodeVibe***는 학습용 코드리뷰 IDE 어플리케이션입니다.<br/>
실시간으로 수정되는 코드리뷰를 보며 스터디원들과 채팅으로 소통할 수 있습니다. <br/>
<img width="139" alt="스크린샷 2024-07-10 오후 8 26 50" src="https://github.com/passion-mansour/passion-mansour-teambeam-frontend/assets/76105226/f8425252-6428-43a6-81aa-6c0774444d17">

## Our Team
|팀원|역할|
|:-:|:-:|
|심하영|프론트|
|박승호|프론트|
|이서연|백엔드|
|강경원|백엔드|
|신승훈|배포&팀장|

## Service Architecture
<img width="728" alt="스크린샷 2024-07-10 오후 8 15 13" src="https://github.com/passion-mansour/passion-mansour-teambeam-frontend/assets/76105226/d17cb7a8-55c5-4940-9c8b-c3ac31aed7ec">

## Service Flow
<img width="507" alt="스크린샷 2024-07-10 오후 8 20 11" src="https://github.com/passion-mansour/passion-mansour-teambeam-frontend/assets/76105226/abec1b35-1d21-4ad2-a8b2-6782962d5b19">

## 담당한 파트
### 실시간 채팅
- STOMP 웹소켓 통신을 통해 실시간 채팅이 가능하게 적용
- 친숙한 메신저 형태로 수신되는 메시지는 좌측, 발신하는 메세지는 우측 배치
### 소켓통신을 통한 실시간 코드 에디터
- 코드 에디터에 입력한 값을 실행버튼을 누르면 실행된 값이 출력될 수 있도록 구현
- 저장 버튼 클릭시, 입력한 코드가 저장될 수 있도록 설정
- STOMP 웹소켓 통신을 통해 해당 방에 참가한 참가자들이 실시간으로 방장의 코드의 변동값을 확인할 수 있도록 구현
- 방장만 코드 에디터 입력 가능한 권한을 부여하도록 구현
- 방장이 방 종료시, 해당 방이 종료된 방으로 변경되고 참가한 참가자들이 강제로 방에서 퇴출되는 방폭파 기능 구현

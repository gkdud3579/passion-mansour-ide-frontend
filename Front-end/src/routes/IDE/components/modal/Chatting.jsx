import { useState, useEffect } from 'react';
import Stomp from 'webstomp-client';
import styles from './Chatting.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SearchIcon } from '../../../../components/Icons';


dayjs.extend(relativeTime);
dayjs.locale('ko');

let stompClient = null;

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:7382/websocket'); // https 사용시 'wss://'로 시작해야 합니다.
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
      stompClient.subscribe('/topic/messages', function(message) {
        const msg = JSON.parse(message.body);
        setMessages(messages => [...messages, msg]);
      });
    }, function(error) {
      console.log('Connection error: ', error);
    });

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('Disconnected!');
        });
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendClick = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        user: { name: '나' },
        timestamp: new Date().toISOString(),
        isOwn: true
      };
      if (stompClient && stompClient.connected) {
        stompClient.send("/app/chat.send", JSON.stringify(newMessage), {});
        setInput('');
      } else {
        console.log("WebSocket is not connected.");
      }
    }
  };

  return (
    <div className={styles.chatModal}>
      <header className={styles.chatHeader}>
        <span>Live Chat</span>
        <div className={styles.chatFunction}>
          <button><SearchIcon size={20} /></button>
          <div>{messages.length}</div>
        </div>
      </header>
      <ul className={styles.messageList}>
        {messages.map((message, index) => (
          <li key={index} className={message.isOwn ? styles.myMessage : styles.theirMessage}>
            {!message.isOwn && (
              <img src={message.user.avatar || '/default_avatar.png'} alt={message.user.name} className={styles.profileImage} />
            )}
            <div className={styles.messageBubble}>
              <div className={styles.messageInfo}>
                <span className={styles.userName}>{!message.isOwn ? message.user.name : '나'}</span>
                <span className={styles.messageTimestamp}>{dayjs(message.timestamp).fromNow()}</span>
              </div>
              <p className={styles.messageText}>{message.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.messageInput}
          value={input}
          onChange={handleInputChange}
          placeholder="코멘트를 입력해주세요"
        />
        <button onClick={handleSendClick} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatting;
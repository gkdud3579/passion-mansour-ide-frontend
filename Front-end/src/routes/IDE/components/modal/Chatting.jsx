import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import styles from './Chatting.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SearchIcon } from '../../../../components/Icons';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const Chatting = ({ projectId, websocketUrl, userData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const stompClient = useRef(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    function connect() {
      const socket = new SockJS(websocketUrl);
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect(
        {},
        (frame) => {
          console.log('Connected: ' + frame);
          stompClient.current.subscribe(`/topic/chat/${projectId}`, (sdkEvent) => {
            console.log('Received message:', sdkEvent.body);
            const msg = JSON.parse(sdkEvent.body);
            addMessage(msg);
          });
        },
        (error) => {
          console.error('Connection error: ', error);
          setTimeout(connect, 5000); // Attempt to reconnect every 5 seconds
        },
      );
    }

    if (!stompClient.current) {
      connect();
    }

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
        console.log('Disconnected!');
      }
    };
  }, [websocketUrl, projectId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick((prev) => prev + 1); // 시간 업데이트를 위한 인터벌
    }, 60000); // 매분마다 업데이트

    return () => clearInterval(intervalId);
  }, []);

  const addMessage = useCallback((msg) => {
    console.log('Adding message:', msg);

    setMessages((prev) => [
      {
        ...msg,
        isOwn: msg.userId === userData.id,
        special: msg.type === 'JOIN' || msg.type === 'LEAVE',
        text: msg.message, // 여기서 msg.message 값을 message.text에 설정합니다.
      },
      ...prev,
    ]);
  }, []);

  const sendMessage = () => {
    if (input.trim() && stompClient.current && stompClient.current.connected) {
      const chatMessage = {
        userId: Number(`${userData.id}`),
        message: input,
        type: 'MESSAGE',
        timestamp: new Date().toISOString(),
      };

      stompClient.current.send(`/app/chat/${projectId}`, JSON.stringify(chatMessage), {});
      // addMessage(chatMessage, true); // Assume the message is always from the user when sent
      setInput('');
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  return (
    <div className={styles.chatModal}>
      <header className={styles.chatHeader}>
        <span>Live Chat</span>
        <div className={styles.chatFunction}>
          <button style={{ display: 'none' }}>
            <SearchIcon size={20} />
          </button>
          <div style={{ display: 'none' }}>{messages.length}</div>
        </div>
      </header>
      <ul className={styles.messageList}>
        {messages.map((message, index) => (
          <li
            key={index}
            className={message.isOwn ? styles.myMessage : message.special ? styles.specialMessage : styles.theirMessage}
          >
            <div className={styles.messageBubble}>
              <div className={styles.messageInfo}>
                {message.isOwn ? <span className={styles.boldText}>나</span> : <span className={styles.userName}>{message.sender}</span>}
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
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatting;

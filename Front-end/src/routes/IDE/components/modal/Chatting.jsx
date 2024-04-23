import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import styles from './Chatting.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SearchIcon } from '../../../../components/Icons';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const Chatting = ({ projectId = 1, userId = 1 }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:7382/websocket');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      {},
      function (frame) {
        console.log('Connected: ' + frame);
        stompClient.current.subscribe(`/topic/chat/${projectId}`, function (sdkEvent) {
          const msg = JSON.parse(sdkEvent.body);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              ...msg,
              text: msg.message,
              isOwn: msg.senderId === userId,
              special: msg.type === 'JOIN' || msg.type === 'LEAVE',
            },
          ]);
        });
      },
      function (error) {
        console.log('Connection error: ', error);
      },
    );

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
        console.log('Disconnected!');
      }
    };
  }, [projectId, userId]);

  const sendMessage = () => {
    if (input.trim() && stompClient.current && stompClient.current.connected) {
      const chatMessage = {
        userId: userId,
        message: input,
        type: 'MESSAGE',
        timestamp: new Date().toISOString(),
      };

      stompClient.current.send(`/app/chat/${projectId}`, JSON.stringify(chatMessage), {});
      addMessageToUI(chatMessage, true);
      setInput('');
    }
  };

  const addMessageToUI = (message, isOwn) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        ...message,
        text: message.message,
        isOwn,
        special: message.type === 'JOIN' || message.type === 'LEAVE',
      },
    ]);
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
                {message.special ? null : <span className={styles.userName}>{message.sender}</span>}
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

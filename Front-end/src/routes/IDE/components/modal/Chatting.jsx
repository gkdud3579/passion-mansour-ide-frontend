import { useState } from 'react';
import styles from './Chatting.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const Chatting = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요.',
      user: {
        name: '고영희',
        avatar: 'img/sample.png',
      },
      timestamp: dayjs().fromNow(),
      isOwn: false,
    },
    {
      id: 2,
      text: '안녕하세요.',
      timestamp: dayjs().fromNow(),
      user: {
        name: '사용자 이름',
        // avatar: '프로필 사진 URL',
      },
      isOwn: true,
    },
  ]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendClick = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        timestamp: new Date().toISOString(),
        user: {
          name: '나',
          avatar: '/myavatar.png',
        },
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <div className={styles.chatModal}>
      <header className={styles.chatHeader}>
        <span>Live Chat</span>
        <div className={styles.chatFunction}>
          <button>검색</button>
          <div>4</div>
        </div>
      </header>
      <ul className={styles.messageList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.messageItem}>
            <div className={message.isOwn ? styles.myMessage : styles.theirMessage}>
              {!message.isOwn && (
                <img src={message.user.avatar} alt={message.user.name} className={styles.profileImage} />
              )}
              <div className={styles.messageBubble}>
                <div className={styles.messageInfo}>
                  <span className={styles.userName}>{!message.isOwn ? message.user.name : '나'}</span>
                  <span className={styles.messageTimestamp}>{dayjs(message.timestamp).fromNow()}</span>
                </div>
                <p className={styles.messageText}>{message.text}</p>
              </div>
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

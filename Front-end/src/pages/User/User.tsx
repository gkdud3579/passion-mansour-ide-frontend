import './User.css';

type UserProps = {
    // 여기에 props 타입 정의
    message: string;
  };
  
  const User: React.FC<UserProps> = ({ message }) => {
    // User 로직
    return <div className="user-bar">{message}</div>;
  };
  
  export default User;
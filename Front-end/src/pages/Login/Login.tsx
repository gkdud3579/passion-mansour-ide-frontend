import './Login.css';

type LoginProps = {
    // 여기에 props 타입 정의
    message: string;
  };
  
  const Login: React.FC<LoginProps> = ({ message }) => {
    // Login 로직
    return <div className="login-bar">{message}</div>;
  };
  
  export default Login;
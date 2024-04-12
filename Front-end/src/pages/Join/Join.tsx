import './Join.css';

type JoinProps = {
    // 여기에 props 타입 정의
    message: string;
  };
  
  const Join: React.FC<JoinProps> = ({ message }) => {
    // join 로직
    return <div className="join-bar">{message}</div>;
  };
  
  export default Join;
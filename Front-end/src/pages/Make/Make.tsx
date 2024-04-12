import './Make.css';

type MakeProps = {
    // 여기에 props 타입 정의
    message: string;
  };
  
  const Make: React.FC<MakeProps> = ({ message }) => {
    // Login 로직
    return <div className="make-bar">{message}</div>;
  };
  
  export default Make;
import './Board.css';

type BoardProps = {
    // 여기에 props 타입 정의
    message: string;
  };
  
  const Board: React.FC<BoardProps> = ({ message }) => {
    // 보드 로직
    return <div className="board-bar">{message}</div>;
  };
  
  export default Board;
  
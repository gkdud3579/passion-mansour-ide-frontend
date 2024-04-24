import { useContext, useEffect } from 'react';
import PrivateContext from '../../contexts/privateContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TestService = () => {
  const { setIsPrivate } = useContext(PrivateContext);

  // const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && id.startsWith('ide')) {
      setIsPrivate(false);
      localStorage.removeItem('isChk');
    }

    if (localStorage.getItem('isChk')) {
      console.log('정상적으로 들어온 사람입니다.');
    } else {
      console.log('비 정상적으로 들어온 사람입니다.');
      localStorage.removeItem('isChk');
      window.alert('잘못 접근된 방입니다');
      navigate('/main');
    }
  }, [id, setIsPrivate, navigate]);

  return <div>{id}</div>;
};

export default TestService;

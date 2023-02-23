
import './App.css';
import axios from 'axios';
import { CLIENT_ID } from './id';

function App() {
  const REDIRECT_URI = "http://localhost:5000/kakao/code"

  const onSignOutHandler = () =>{
    axios.get('http://localhost:5000/kakao/logout');
  }

  const onUnlinkHandler = () =>{
    axios.get('http://localhost:5000/kakao/unlink');
  }

  return (
    <div className="App">
      <header className="App-header">
        <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid,profile_nickname,account_email&prompt=login`}>
          <div className="kakao_btn"></div>
        </a>

        
        <div className="kakao logout" onClick={onSignOutHandler}>
            <p>로그아웃</p>
        </div>
        <div className="kakao unlink" onClick={onUnlinkHandler}>
            <p>내 카카오계정과 연결 끊기</p>
        </div>
      </header>
    </div>
  );
}

export default App;

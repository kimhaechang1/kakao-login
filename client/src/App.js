
import './App.css';
import axios from 'axios';
import { CLIENT_ID } from './id';

function App() {
  const REDIRECT_URI = "http://localhost:5000/kakao/code"

  const onSignOutHandler = () =>{
    axios.get('http://localhost:5000/kakao/logout');
  }

  return (
    <div className="App">
      <header className="App-header">
        <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid,profile_nickname,account_email&prompt=login`}>
          <div className="kakao_btn"></div>
        </a>

        
        <div className="kakao_logout" onClick={onSignOutHandler}>
            <p>로그아웃</p>
        </div>
      </header>
    </div>
  );
}

export default App;

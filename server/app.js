const express = require('express');

const base64json = require('base64json');

const PORT = 5000;

const router = express.Router();

const axios = require('axios');

const app = express();

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"

const KAKAO_OAUTH_LOGOUT_API_URL = "https://kapi.kakao.com//v1/user/logout"

const KAKAO_GRANT_TYPE="authorization_code"

const key = require('./server_id');

const KAKAO_REDIRECT_URL="http://localhost:5000/kakao/code"

let accessToken = "123";
let id_token = "123";
let nickName = "df";
let email = "";

app.get('/kakao/code',(req, res, next)=>{
    let code = req.query.code;
    axios({
        method : 'post',
        url : `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_id=${key.KAKAO_CLIENT_ID}&client_secret=${key.KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URL}&code=${code}`,
        headers:{
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }        
    }).then((result)=>{
        console.log("로그인 되었습니다.")
        accessToken = result.data['access_token'];
        id_token = result.data['id_token'];
        const userData = base64json.parse(id_token.split('.')[1],'base64');
        console.log(userData.nickname);
        console.log(userData.email);
        res.send("로그인완료");
    }).catch((err)=>{
        console.log(err);
    })
})

app.get('/kakao/logout',(req,res,next)=>{
    axios({
        method : 'post',
        url : `${KAKAO_OAUTH_LOGOUT_API_URL}`,
        headers :{
            Authorization: `Bearer ${accessToken}`
        }

    }).then((result)=>{
        console.log("로그아웃 되었습니다.");
        console.log(result.data['id']);
        
    }).catch((err)=>{
        console.log(`에러코드 : ${err}`);
    })
})

app.listen(PORT, ()=>{
    console.log(`서버열림 포트번호 : ${PORT}`);
})


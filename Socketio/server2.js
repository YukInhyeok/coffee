// 모듈을 추출합니다.
const http = require('http');
const express = require('express');
const fs = require('fs');
const socketio = require('socket.io');

const app = express();

app.get('/',(request, response)=>{
    // HTMLPage.html 파일을 읽습니다.
    fs.readFile('client2.html', (error, data)=>{
        response.send(data.toString());
    });
})

// 웹 서버를 생성합니다.
const httpServer = http.createServer(app).listen(3000, () => { 
    console.log("포트 3000에 연결되었습니다."); 
}); 

// 소켓 서버를 생성 및 실행합니다.
var io = socketio(httpServer);
io.sockets.on('connection', function (socket) {
  // rint 이벤트
  socket.on('rint', function (data) {
    // 클라이언트가 전송한 데이터를 출력합니다.
    console.log('Client Send Data:', data);

    // 클라이언트에 smart 이벤트를 발생시킵니다.
    socket.emit('smart', data);
  });
});
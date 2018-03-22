// 익스프레스
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

// 몽구스를 받아온다!
const mongoose = require('mongoose');
// DB 연결할 때 필요한 설정 파일
const config = require('./config.js');
// 포트 설정
const port = process.env.port || 3001;
// 바디 파서 설정이요 JSON 코드 받을 때 필요합니당
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 개발 모드 설정이요
app.use(morgan('dev'));
// 예 이걸로 시크릿키 받아오구요
app.set('jwt-secret', config.secret);
// 빌드 파일 입니당 이걸로 리액트 클라이언트 파일 끌어와요
app.use(express.static(path.join(__dirname, '../build')));

// api 처음 받았을 때 줄 주소였는데
app.get('/api/hello', function(req, res) {
  let admin = new Admin();
  ` `;
  admin.id = 'hello';
  admin.password = 'metoo';

  admin.save(function(err) {
    if (err) {
      console.log('이런 에러가 나버렸넹');
    }
    console.log('에러 아니지롱~');
  });

  res.json({ message: 'HelloJwt' });
});

/* =======================
  모오옹고디비 서버에 연! 결!
========================== */
mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
// 에러나면
db.on('error', console.error.bind(console, 'connection error:'));
// 연결성공하면
db.once('open', function() {
  // we're connected!
  console.log("We're connnected");
});

// 로긴 할때 받아오려는 겁니다...
app.use('/api', require('./routes/api'));

// 서버 열어 버리기~
app.listen(port, () => {
  console.log('server is running at http://localhost:' + port);
});
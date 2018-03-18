const express = require('express');
const path = require('path');
const app = express();
// 몽고디비 함 불러보자~!
const mongo = require('./DB/mongo.js');
// 스키마도 같이 함 불러보즈아~~~!
const Admin = require('./DB/Schemas/Admin.js');

const port = process.env.port || 3001;

app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/hello', function(req, res) {
  let admin = new Admin();
  admin.id = 'hello';
  admin.password = 'metoo';
  admin.date = new Date();

  admin.save(function(err) {
    if (err) {
      console.log('이런 에러가 나버렸넹');
    }
    console.log('에러 아니지롱~');
  });

  res.json({ message: 'ahwef;awlfjaeow;i' });
});

app.listen(port, () => {
  console.log('server is running at http://localhost:' + port);
});

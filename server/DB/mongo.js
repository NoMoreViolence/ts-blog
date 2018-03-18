// 몽구스를 받아온다!
const mongoose = require('mongoose');
// 몽고디비에 연결한다!
mongoose.connect('mongodb://localhost/blog');
const db = mongoose.connection;
// 에러나면
db.on('error', console.error.bind(console, 'connection error:'));
// 연결성공하면
db.once('open', function() {
  // we're connected!
  console.log("We're connnected");
});

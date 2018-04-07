// 카테고리
const Category = require('./Category');
// 포스트 별 리플
const PostRipple = require('./PostRipple');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 스키마
const Post = new Schema({
  title: { type: String, unique: true }, // 포스트이름, 유니크
  subTitle: { type: String }, // 서브 타이틀, 간략하게 보여질 때 사용함
  mainText: { type: String, required: true }, // 포스트 내용, 스트링, 필수
  category: { type: String, required: true }, // 카테고리, 스트링타입, 필수
  comment: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'postripple' } // 댓글들 모음, 필수! 는 아닌데...
  ], // 포스트에 달릴 댓글!
  date: { type: Date, default: Date.now } // 포스팅 날짜
});

// 포스트 이름 중복 체크
Post.statics.checkTitle = function(title) {
  return this.findOne({ title }).exec();
};

Post.statics.createPost = function(category, title, subTitle, mainText) {
  const post = new this({
    title,
    subTitle,
    mainText,
    category
  });

  return post.save();
};

// 포스트 댓글 불러오는 함수
Post.statics.findComment = function(category) {
  return this.find({ category }).exec();
};

// 포스트 삭제
Post.statics.remove = function(title) {
  PostRipple.find({ title: title }).remove();
  this.remove({ title: title });
};

module.exports = mongoose.model('post', Post);

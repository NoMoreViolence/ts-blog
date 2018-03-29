const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 카테고리 스키마
const Category = new Schema({
  category: { type: String, required: true, unique: true }, // 카테고리 이름, 필수, 유니크함, 공백을 없애버리지~
  posts: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'post' }] // 포스트 populate 사용 하기 위해서 ref로 포스트들 저장될 디비를 가리킴
});

/* */
// 카테고리 중복 체크
Category.statics.findSameCategory = function(category) {
  return this.findOne({ category }).exec();
};
// 카테고리 생성!
Category.statics.createCategory = function(category) {
  const Cart = new this({
    category
  });

  return Cart.save();
};
/* */

// 카테고리 삭제 부분
Category.statics.remove = function(category) {
  return this.remove({ category });
};

// 익스포트
module.exports = mongoose.model('category', Category);

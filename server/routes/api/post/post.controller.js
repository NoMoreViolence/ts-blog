const Post = require('./../../../models/Post');

/*
    POST /api/category/create
    {
        token,
        category
    }
*/
// 카테고리 생성
exports.create = (req, res) => {
  const { category, title, subTitle, mainText } = req.body;

  // 중복된 카테고리나, 입력값이 없을 때 오류를 보냄
  const create = exists => {
    if (exists) {
      throw new Error('입력값이 없거나 중복된 Title 값 입니다');
    } else {
      return Post.createPost(category, title, subTitle, mainText); // 카테고리 생성
    }
  };

  // 응답
  const respond = () => {
    res.json({
      success: true,
      message: 'Create Category Success',
      title,
      subTitle
    });
  };

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  Post.checkTitle(title)
    .then(create)
    .then(respond)
    .catch(onError);
};

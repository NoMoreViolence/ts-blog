const Post = require('./../../../models/Post');
const Category = require('./../../../models/Category');

/*
    POST /api/post/create
    {
        token,
        category,
        title,
        subTitle,
        mainText
    }
*/
// 포스트 생성
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

  // 포스트 생성 후 같은 카테고리 포스트의 _id 값 객체만을 전달받았음
  const categoryRef = async newPosts => {
    // 카테고리와 함께 객체를 보냄
    return await Category.update(newPosts, category);
  };

  // 응답
  const respond = result => {
    res.json({
      success: true,
      message: 'Create Category Success',
      title,
      subTitle,
      result
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
    .then(categoryRef)
    .then(respond)
    .catch(onError);
};

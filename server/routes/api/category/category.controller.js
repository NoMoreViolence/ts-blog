const Category = require('./../../../models/Category');

/*
    POST /api/auth
    {
        username,
        password
    }
*/
// 카테고리 생성
exports.create = (req, res) => {
  const { category } = req.body;

  // 중복된 카테고리인지 확인함
  const create = exists => {
    console.log(exists);
    if (exists) {
      throw new Error('category exists');
    } else {
      return Category.createCategory(category); // 카테고리 생성
    }
  };

  // respond to the client
  const respond = () => {
    res.json({
      success: true,
      message: 'Create Category Success'
    });
  };

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  // 카테고리 별 작업
  Category.findSameCategory(category)
    .then(create)
    .then(respond)
    .catch(onError);
};

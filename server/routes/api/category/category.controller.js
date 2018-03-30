const Category = require('./../../../models/Category');

/*
    GET /api/category/all
    {

    }
*/
// 모든 카테고리만 검색 후 출력
exports.all = (req, res) => {
  const show = () => {
    return Category.findAll();
  };

  // respond to the client
  const respond = result => {
    res.json({
      success: true,
      message: 'View All Categories',
      category: result
    });
  };

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  show() // 실행
    .then(respond) // 응답
    .catch(onError); // 에러
};
/*
    GET /api/category/picked/:CartName
    {

    }
*/
// 특정 카테고리 정보 가져오기, 카테고리의 포스트 전부를 가져오게 할 것임 || (아직 완성되지 않음) => 포스트 rest api 정리가 끝나지 않았음
exports.picked = (req, res) => {
  console.log(req.params.CartName);
};

/*
    POST /api/category/create
    {
        token,
        category
    }
*/
// 카테고리 생성
exports.create = (req, res) => {
  const { category } = req.body;

  // 중복된 카테고리인지 확인함
  const create = exists => {
    console.log(exists);
    if (exists) {
      throw new Error('Category Exists');
    } else {
      return Category.createCategory(category); // 카테고리 생성
    }
  };

  // 응답
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

  Category.findSameCategory(category) // 중복 카테고리 찾기
    .then(create) // 중복 카테고리가 없으면 새 카테고리 생성 OR 만들지 않음
    .then(respond) // 상황에 따라 응답
    .catch(onError); // 오류 처리
};

/*
    PUT /api/category/change
    {
        token,
        category,
        changeCategory
    }
*/
// 카테고리 변경
exports.change = (req, res) => {
  const { category, changeCategory } = req.body;

  // 카테고리 삭제 부분
  const change = exists => {
    if (exists) {
      console.log(`${exists.category} will be changeed to ${changeCategory}`);
      // 카테고리 변경
      return Category.changeCategory(category, changeCategory); // 카테고리 삭제
    } else {
      // 삭제할 카테고리가 없음
      throw new Error('Category does not exist - Category.delete()');
    }
  };

  // 응답
  const respond = () => {
    res.json({
      success: true,
      message: `Change Category Success => ${category} to ${changeCategory}`,
      result: changeCategory
    });
  };

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  Category.findSameCategory(category)
    .then(change)
    .then(respond)
    .catch(onError);
};

/*
    DELETE /api/category/delete
    {
        token,
        category
    }
*/
// 카테고리 삭제
exports.delete = (req, res) => {
  const { category } = req.body;

  // 카테고리 삭제 부분
  const remove = exists => {
    console.log(`${exists.category} will be deleted`);
    if (exists) {
      // 카테고리 삭제
      return Category.deleteCategory(category); // 카테고리 삭제
    } else {
      // 삭제할 카테고리가 없음
      throw new Error('Category does not exist - Category.delete()');
    }
  };

  // 응답
  const respond = () => {
    res.json({
      success: true,
      message: 'Delete Category Success'
    });
  };

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  Category.findSameCategory(category)
    .then(remove)
    .then(respond)
    .catch(onError);
};

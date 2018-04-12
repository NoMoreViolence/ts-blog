// 리액트
import * as React from 'react';
// CSS
import './Change.css';
// 파일 분류
import ChangePost from './ChangePost/ChangePost';
import SelectCategory from './SelectCategory/SelectCategory';
import SelectPost from './SelectPost/SelectPost';

// 카테고리 받아올 때 props 내부 변수 인터페이스
interface Category {
  category: string;
}

// 포스트의 제목만 받아올 때 state 내부 변수 인터페이스
interface Post {
  title: string;
}

interface CategoryUnit {
  category: string;
  title: string;
  subTitle: string;
  mainText: string;
}

class Change extends React.Component<
  {
    handleSearchCategorysPost: Function,
    category: Array<Category>,
    formats: Array<string>,
    modules: object,
    posts: Array<Post>,
  },
  {}
> {
  state = {
    // [변경할 포스트 요소]
    category: '카테고리 선택', // [카테고리]
    title: '', // [제목]
    oldTitle: '', // [서버에 보낼 원래 포스트 이름]
    subTitle: '', // [부제목]
    editorState: '', // [마크다운 에디터]
  };

  // 포스트를 클릭했을 때 State를 변경시킴
  handleDeliverPostData = (data: CategoryUnit) => {
    this.setState({
      category: data.category,
      title: data.title,
      subTitle: data.subTitle,
      editorState: data.mainText,
    });
    // tslint:disable-next-line:semicolon
  };

  render() {
    const {
      // [포스트 선택]
      category,
    } = this.state;

    return (
      <div className="change-container">
        <div className="change-toogle">
          <div className="change-category-choice-dropdown">
            <SelectCategory
              handleSearchCategorysPost={this.props.handleSearchCategorysPost}
              category={this.props.category}
            />
          </div>
          <div className="change-posts-choice-dropdown">
            <SelectPost
              posts={this.props.posts}
              handleDeliverPostData={this.handleDeliverPostData}
            />
          </div>
        </div>
        <div>
          <ChangePost
            currentCategory={this.props.category} // 이건 카테고리 모음
            formats={this.props.formats}
            modules={this.props.modules}
            category={category} // 이건 데이터를 불러오는 카테고리!
            title={this.state.title}
            subTitle={this.state.subTitle}
            editorState={this.state.editorState}
          />
        </div>
      </div>
    );
  }
}

export default Change;

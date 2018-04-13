import * as React from 'react';
import './Delete.css';
// 리액트 스트랩
import {
  Input,
  InputGroup,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// 리액트 알람
import { toast } from 'react-toastify';

// 텍스트 입력 바꾸기 인터페이스
interface TextEdit {
  target: HTMLInputElement;
}

// 카테고리 받아올 때 props 내부 변수 인터페이스
interface Category {
  category: string;
}

// 카테고리별 포스트 타이틀 받아오는 함수
interface Post {
  title: string;
}

// 드롭 다운 선택자 인터페이스
interface Dropdown {
  currentTarget: { textContent: string };
}

class Delete extends React.Component<
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
    // 카테고리 선택 부분
    categoryDropdown: false,
    selectCategory: '카테고리 선택',

    // 포스트 부분
    postDropdown: false,
    selectPost: '포스트 선택',

    // 삭제 중복확인
    doubleCheck: '',
  };

  // [공통: 글자 바꾸기]
  handleChange = (e: TextEdit) => {
    this.setState({
      doubleCheck: e.target.value,
    });
    // tslint:disable-next-line:semicolon
  };

  // [카테고리 토글 변경하기]
  handleCategoryToogle = () => {
    this.setState({
      categoryDropdown: !this.state.categoryDropdown,
    });
    // tslint:disable-next-line:semicolon
  };
  // [카테고리 선택]
  handleSelectCategory = async (e: Dropdown) => {
    // await 걸어서 state 바뀐 후 fetch 실행
    await this.setState({
      selectCategory: e.currentTarget.textContent,
      selectPost: '포스트 선택',
    });
    this.props.handleSearchCategorysPost(this.state.selectCategory, 'delete');
    // tslint:disable-next-line:semicolon
  };
  // [포스트 토글 변경하기]
  handlePostToogle = () => {
    this.setState({
      postDropdown: !this.state.postDropdown,
    });
    // tslint:disable-next-line:semicolon
  };
  // [포스트 선택] => 포스트 선택했을때 타이틀 부제목 메인텍스트까지 보여줌
  handleSelectPost = (e: Dropdown) => {
    this.setState({
      selectPost: e.currentTarget.textContent,
    });
    // tslint:disable-next-line:semicolon
  };
  // [포스트 삭제 fetch]
  delete = () => {
    // 포스트 선택 X && 중복체크 까지 완료됨
    if (
      this.state.selectPost === this.state.doubleCheck &&
      this.state.selectPost !== '포스트 선택'
    ) {
      console.log(sessionStorage.getItem('token'));
      fetch('/api/post/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: sessionStorage.getItem('token'), // JWT 토큰
          title: this.state.doubleCheck.trim(),
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            toast(`"${this.state.doubleCheck}" 포스트 삭제가 완료되었습니다`);
          } else {
            toast(`"${this.state.doubleCheck}" 포스트 삭제에 실패했습니다`);
          }
          // State 및 토글 초기화
          this.setState({
            selectCategory: '카테고리 선택',
            selectPost: '포스트 선택',
            doubleCheck: '',
          });
          this.props.handleSearchCategorysPost('카테고리 선택');
        })
        .catch(error => {
          toast('서버에 오류가 발생해서 요청하신 작업을 완료하지 못했습니다');
          console.log(error);
        });
    } else {
      toast('이름 중복 체크 실패 OR 포스트 선택 실패');
    }
    // tslint:disable-next-line:semicolon
  };
  render() {
    const {
      categoryDropdown,
      selectCategory,
      postDropdown,
      selectPost,
      doubleCheck,
    } = this.state;

    const selectCategoryBar = (data: Array<Category>) => {
      return data.map((object, i) => {
        return (
          <DropdownItem key={i} onClick={this.handleSelectCategory}>
            {object.category}
          </DropdownItem>
        );
      });
    };

    const selectPostBar = (data: Array<Post>) => {
      return data.map((object, i) => {
        return (
          <DropdownItem key={i} onClick={this.handleSelectPost}>
            {object.title}
          </DropdownItem>
        );
      });
    };

    return (
      <div className="delete-container">
        <div className="delete-category-choice-dropdown">
          <Dropdown
            isOpen={categoryDropdown}
            toggle={this.handleCategoryToogle}
          >
            <DropdownToggle outline={true} color="danger" caret={true}>
              {selectCategory}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.handleSelectCategory}>
                카테고리 선택
              </DropdownItem>
              {selectCategoryBar(this.props.category)}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="delete-post-choice-dropdown">
          <InputGroup>
            <Dropdown isOpen={postDropdown} toggle={this.handlePostToogle}>
              <DropdownToggle outline={true} color="danger" caret={true}>
                {selectPost}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleSelectPost}>
                  포스트 선택
                </DropdownItem>
                {selectPostBar(this.props.posts)}
              </DropdownMenu>
            </Dropdown>
            <Input
              name="doubleCheck"
              value={doubleCheck}
              onChange={this.handleChange}
              placeholder="삭제할 포스트 이름 재입력"
            />
          </InputGroup>
        </div>
        <div className="delete-button">
          <Button size="lg" block={true} color="danger" onClick={this.delete}>
            삭제하기 !
          </Button>
        </div>
      </div>
    );
  }
}
export default Delete;

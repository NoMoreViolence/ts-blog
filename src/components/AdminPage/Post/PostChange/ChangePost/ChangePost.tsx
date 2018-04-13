import * as React from 'react';
import * as ReactQuill from 'react-quill'; // 리액트 편집기 모듈 다운로드
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
import { toast } from 'react-toastify';

// 드롭 다운 선택자 인터페이스
interface Dropdown {
  currentTarget: { textContent: string };
}

// 텍스트 입력 바꾸기 인터페이스
interface TextEdit {
  target: HTMLInputElement;
}

interface PostUnit {
  category: string;
  title: string;
  subTitle: string;
  editorState: string;
}

// 카테고리 받아올 때 props 내부 변수 인터페이스
interface Category {
  category: string;
}

// 포스트 체인지 부분만 바꾸어 놓았습니다 허허
class ChangePost extends React.Component<
  {
    currentCategory: Array<Category>, // 현재의 카테고리들 다 모은 Props []
    category: string, // 수정할 옛날 포스트의 카테고리 Props
    title: string, // 타이틀 Props
    subTitle: string, // 부제목 Props
    editorState: string, // 에디터 Props
    formats: Array<string>, // Quill
    modules: object, // Quill
    handleSearchCategorysPost: Function, // 포스트 전송 성공 후 변경용
    originFun: Function,
  },
  {}
> {
  state = {
    // 드롭다운
    dropDown: false,
    currentCategory: '카테고리 선택',

    // 에디터
    title: '',
    subTitle: '',
    editorState: '',
  };
  // [토글]
  handleToogle = () => {
    this.setState({
      dropDown: !this.state.dropDown,
    });
    // tslint:disable-next-line:semicolon
  };
  // [값 바꾸기]
  handleChangeToogleValue = (e: Dropdown) => {
    this.setState({
      currentCategory: e.currentTarget.textContent,
    });
    // tslint:disable-next-line:semicolon
  };
  // [글자 변경]
  handleChange = (e: TextEdit) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // tslint:disable-next-line:semicolon
  };
  // [에디터 state 업데이트]
  handleEditorChange = (e: string) => {
    this.setState({
      editorState: e,
    });
    // tslint:disable-next-line:semicolon
  };

  // [클릭했을 때 값 전송 메소드]
  change = () => {
    // 타이틀, 부제목, 현재 카테고리, 에디터
    const { title, subTitle, currentCategory, editorState } = this.state;

    if (
      title !== '' &&
      subTitle !== '' &&
      currentCategory !== '카테고리 선택' &&
      editorState !== ''
    ) {
      fetch('/api/post/change', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: sessionStorage.getItem('token'), // JWT 토큰
          category: currentCategory.trim(), // 현재 카테고리
          title: title.trim(), // 타이틀
          oldTitle: this.props.title, // 에전 타이틀
          subTitle: subTitle.trim(), // 서브 타이틀
          mainText: editorState, // 메인 내용
        }),
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            toast('포스트 수정 성공!');
            this.props.handleSearchCategorysPost('카테고리 선택', 'change');
            this.props.originFun(1);
          } else {
            toast('포스트 수정 실패!');
            toast(res.message);
          }
        })
        .catch(res => {
          toast('알 수 없는 서버의 오류');
        });
    } else {
      toast('모든 요소를 빠짐없이 입력해 주세요');
    }
    // tslint:disable-next-line:semicolon
  };

  // 포스트 선택했을 때 포스트 정보 보여줌
  componentDidUpdate(prevProps: PostUnit, prevState: object) {
    if (prevProps.title !== this.props.title) {
      this.setState({
        currentCategory: this.props.category,
        title: this.props.title,
        subTitle: this.props.subTitle,
        editorState: this.props.editorState,
      });
    }
  }

  render() {
    const {
      dropDown,
      currentCategory,
      title,
      subTitle,
      editorState,
    } = this.state;

    const selectCategoryBar = (data: Array<Category>) => {
      return data.map((object, i) => {
        return (
          <DropdownItem key={i} onClick={this.handleChangeToogleValue}>
            {object.category}
          </DropdownItem>
        );
      });
    };

    return (
      <div>
        <div className="change-dropdown-and-input">
          <InputGroup>
            <Dropdown isOpen={dropDown} toggle={this.handleToogle}>
              <DropdownToggle outline={true} color="info" caret={true}>
                {currentCategory}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleChangeToogleValue}>
                  카테고리 선택
                </DropdownItem>
                {/* 현재 카테고리 모음을 불러옴 this.props.currentCategory */}
                {selectCategoryBar(this.props.currentCategory)}
              </DropdownMenu>
            </Dropdown>
            <Input
              name="title"
              value={title}
              placeholder="포스트의 제목을 입력해 주세요"
              onChange={this.handleChange}
            />
          </InputGroup>
          <div className="subtitle-input">
            <Input
              name="subTitle"
              value={subTitle}
              placeholder="포스트 간략한 설명"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="change-editor">
          <ReactQuill
            theme="snow"
            value={editorState}
            formats={this.props.formats}
            modules={this.props.modules}
            onChange={this.handleEditorChange}
            /* modules={this.props.modules} formats={this.props.formats} */
          />
        </div>

        <div className="posting">
          <Button size="lg" block={true} color="info" onClick={this.change}>
            변경하기 !
          </Button>
        </div>
      </div>
    );
  }
}

export default ChangePost;

import * as React from 'react';
import './Add.css';
import * as ReactQuill from 'react-quill'; // 리액트 편집기 모듈 다운로드
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

// 텍스트 입력 바꾸기
interface TextEdit {
  target: HTMLInputElement;
}

// props 카테고리 정의
interface Category {
  category: string;
}

// 드롭 다운 선택자
interface Dropdown {
  currentTarget: { textContent: string };
}

class Add extends React.Component<
  {
    category: Array<Category>,
    formats: Array<string>,
    modules: object,
  },
  {}
> {
  state = {
    currentCategory: '추가할 카테고리 선택', // [현재의 카테고리, 추가할 카테고리가 된다]
    categoryChangeDropdown: false, // [추가할 카테고리 드롭다운 버튼]

    title: '', // [포스트 이름]
    subTitle: '', // [포스트 간략 설명]
    editorState: '', // [마크다운 에디터]

    tempSavedCategory: '임시저장된 포스트 선택',
    categorySavedDropdown: false, // [추가할 카테고리 드롭다운 버튼]
  };

  // 글자 state 업데이트
  handleChange = (e: TextEdit) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // tslint:disable-next-line:semicolon
  };
  // 에디터 state 업데이트
  handleEditorChange = (e: string) => {
    this.setState({
      editorState: e,
    });
    // tslint:disable-next-line:semicolon
  };

  // [현재 드롭다운 토글] 카테고리 나오고 안나오고
  handleCategoryChangeToggle = () => {
    this.setState({
      categoryChangeDropdown: !this.state.categoryChangeDropdown,
    });
    // tslint:disable-next-line:semicolon
  };
  // [임시저장 드롭다운 토글] 카테고리 나오고 안나오고
  handleSavedCategoryChangeToggle = () => {
    this.setState({
      categorySavedDropdown: !this.state.categorySavedDropdown,
    });
    // tslint:disable-next-line:semicolon
  };
  // [현재 드롭다운 변경] 카테고리 선택시 데이터 바꿔주기
  handleCurrentCategory = (e: Dropdown) => {
    this.setState({ currentCategory: e.currentTarget.textContent });
    // tslint:disable-next-line:semicolon
  };
  // [임시저장 드롭다운 변경] 카테고리 선택시 데이터 바꿔주기
  handleSavedCurrentCategory = (e: Dropdown) => {
    this.setState({ tempSavedCategory: e.currentTarget.textContent });
    // tslint:disable-next-line:semicolon
  };

  // 포스팅 함수
  post = (e: React.FormEvent<HTMLFormElement>) => {
    //  이벤트 버블링 방지용
    e.preventDefault();

    // state 매쉬 문법으로 정의
    const { title, subTitle, currentCategory, editorState } = this.state;

    // 카테고리 추가할 때 꼭 필요한 조건, 제목, 섭타이틀, 현재 카테고리
    if (
      title !== '' &&
      subTitle !== '' &&
      currentCategory !== '추가할 카테고리 선택'
    ) {
      fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: sessionStorage.getItem('token'), // JWT 토큰
          category: currentCategory.trim(), // 현재 카테고리
          title: title.trim(), // 타이틀
          subTitle: subTitle.trim(), // 서브 타이틀
          mainText: editorState, // 메인 내용
        }),
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            // 포스트 추가 성공일 때
            console.log(res.message);
            toast('포스트 추가 성공!');
            // 전송 성공 후 State 초기화
            this.setState({
              currentCategory: '추가할 카테고리 선택',
              title: '',
              subTitle: '',
              editorState: '',
            });
          } else {
            // 포스트 추가 실패
            console.log(res.message);
            toast('포스트 추가 실패!');
            toast(res.message);
          }
        })
        .catch(res => {
          console.log(res.message);
          toast('알 수 없는 서버의 오류');
        });
    } else {
      toast('카테고리, 포스트 이름, 포스트 설명을 써 주세요');
    }
    // tslint:disable-next-line:semicolon
  };
  // [최적화]
  shouldComponentUpdate(nextProps: object, nextState: object) {
    return nextState !== this.state;
  }

  render() {
    // state 정의
    const {
      title, // 타이틀
      subTitle, // 부제
      currentCategory, // 추가할 카테고리 현재
      categoryChangeDropdown, // 추가할 카테고리 누르면 드롭다운 ㄱ
      tempSavedCategory, // 임시 저장 카테고리
      categorySavedDropdown, // 임시 저장된 카테고리 누르면 드롭다운
    } = this.state;

    // 데이터 받아서 정렬
    const currentCategoryChangeBar = (data: Array<Category>) => {
      return data.map((object, i) => {
        return (
          <DropdownItem key={i} onClick={this.handleCurrentCategory}>
            {object.category}
          </DropdownItem>
        );
      });
    };
    /*
    const tempSavedCategoryChangeBar = () => {
      return true;
    };
    */

    return (
      <div className="add-container">
        {/* 임시저장 포스트 불러오는 부분, 나중에 작업 예정 */}
        <div className="temp-save">
          <Button color="primary">임시 저장</Button>
          <Dropdown
            className="add-input"
            isOpen={categorySavedDropdown}
            toggle={this.handleSavedCategoryChangeToggle}
          >
            <DropdownToggle outline={true} color="primary" caret={true}>
              {tempSavedCategory}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.handleSavedCurrentCategory}>
                임시저장된 포스트 선택
              </DropdownItem>
              <DropdownItem onClick={this.handleSavedCurrentCategory}>
                하하호호 테스트
              </DropdownItem>
              {/* 임시저장 포스트 클릭시 포스트 데이터 불러옴 */}
              {/* tempSavedCategoryChangeBar() */}
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* 임시저장 포스트 불러오는 부분, 나중에 작업 예정 */}

        {/* 포스트 추가 부분 */}
        <div className="post-name-and-info">
          <InputGroup>
            <Dropdown
              className="add-input"
              isOpen={categoryChangeDropdown}
              toggle={this.handleCategoryChangeToggle}
            >
              <DropdownToggle outline={true} color="primary" caret={true}>
                {currentCategory}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleCurrentCategory}>
                  추가할 카테고리 선택
                </DropdownItem>
                {currentCategoryChangeBar(this.props.category)}
              </DropdownMenu>
            </Dropdown>
            <Input
              className="add-input"
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="포스트 제목 입력"
            />
          </InputGroup>
          <Input
            className="add-input"
            name="subTitle"
            value={subTitle}
            onChange={this.handleChange}
            placeholder="포스트 간략한 설명"
          />
        </div>
        {/* 에디터 */}
        <div className="postarea">
          <ReactQuill
            theme="snow"
            onChange={this.handleEditorChange}
            value={this.state.editorState}
            formats={this.props.formats}
            modules={this.props.modules}
          />
        </div>
        {/* 전송! */}
        <div className="posting">
          <Button size="lg" block={true} color="primary" onClick={this.post}>
            포스팅 !
          </Button>
        </div>
      </div>
    );
  }
}

export default Add;

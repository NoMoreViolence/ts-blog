import * as React from 'react';
// 리액트 스트랩
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { toast } from 'react-toastify';

interface Dropdown {
  currentTarget: { textContent: string };
}

// 포스트의 제목만 받아올 때 state 내부 변수 인터페이스
interface Post {
  title: string;
}

class SelectPost extends React.Component<
  { posts: Array<Post>, handleDeliverPostData: Function },
  {}
> {
  state = {
    dropDown: false,
    selectPost: '포스트 선택',
  };

  // 토글
  handleToogle = () => {
    this.setState({
      dropDown: !this.state.dropDown,
    });
    // tslint:disable-next-line:semicolon
  };

  // 클릭
  handleSelectPost = async (e: Dropdown) => {
    await this.setState({
      selectPost: e.currentTarget.textContent,
    });

    // 만약 내가 쓸떼없이 포스트 선택을 누르지 않고 정확한 포스트를 눌렀으면
    if (this.state.selectPost !== '포스트 선택') {
      // Fetch를 통해서 불러온 API 값을 통해 Post 작성 부분을 업데이트 합니다
      fetch(`/api/post/${this.state.selectPost}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            // API 데이터를 바탕으로 함수 실행
            this.props.handleDeliverPostData(res.result);
          } else {
            toast('서버의 오류로 불러올 수 없습니다');
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    } else {
      // 그러나 내가 포스트 선택을 눌렀을 경우에는 그저 데이터를 바꿔 끼워서 직접 함수 실행 시켜줍니다
      this.props.handleDeliverPostData({
        category: '카테고리 선택',
        title: '',
        subTitle: '',
        editorState: '',
      });
    }
    // tslint:disable-next-line:semicolon
  };

  // 컴포넌트가 바뀌었을 때 바뀌어지는 메소드
  componentDidUpdate(prevProps: { posts: object }, PrevState: object) {
    if (prevProps.posts !== this.props.posts) {
      this.setState({
        selectPost: '포스트 선택',
      });
      this.props.handleDeliverPostData({
        category: '카테고리 선택',
        title: '',
        subTitle: '',
        editorState: '',
      });
    }
  }

  render() {
    const { dropDown, selectPost } = this.state;

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
      <Dropdown isOpen={dropDown} toggle={this.handleToogle}>
        <DropdownToggle outline={true} color="info" caret={true}>
          {selectPost}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.handleSelectPost}>
            포스트 선택
          </DropdownItem>
          {selectPostBar(this.props.posts)}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default SelectPost;

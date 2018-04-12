import * as React from 'react';
import './Post.css';
import { Container, Row, Col, Button } from 'reactstrap';
// 마크다운 에디터 테마 & 코드 하이라이팅 모듈 불러오기
import 'react-quill/dist/quill.snow.css'; // ES6
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/atom-one-dark.css';
// 포스트 추가, 변경, 삭제 모듈 불러오기
import Add from './../Post/PostAdd/Add';
import Change from './../Post/PostChange/Change';
import Delete from './../Post/PostDelete/Delete';

interface ButtonChange {
  currentTarget: { name: string };
}

interface Category {
  category: string;
}
class Post extends React.Component<{ category: Array<Category> }, {}> {
  state = {
    // Add, Change, Delete 토글을 눌렀을때 보여질지 안보여질지 보여주는 State
    addShowNone: false,
    changeShowNone: false,
    deleteShowNone: false,
    // 특정 카테고리 선택 후의 포스트 이름만 모은 배열
    posts: [],
  };

  // 에디터 포맷
  formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'code-block',
    'link',
    'image',
    'video',
  ];
  // 에디터 모듈s
  modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    syntax: true,
  };

  // [공통] 입력값 업데이트
  handleShowNone = (e: ButtonChange) => {
    this.setState({
      [e.currentTarget.name]: !this.state[e.currentTarget.name],
    });
    console.log(this.state[e.currentTarget.name]);
    // tslint:disable-next-line:semicolon
  };

  // 카테고리 선택시 포스트 불러오는 부분
  handleSearchCategorysPost = (e: string) => {
    if (e !== '카테고리 선택') {
      fetch(`/api/category/getPostNames/${e}`, {
        method: 'GET',
        headers: {},
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            this.setState({
              posts: res.result.posts,
            });
          } else {
            this.setState({
              posts: [],
            });
          }
        })
        .catch((error: string) => {
          return error;
        });
    } else {
      this.setState({
        posts: [],
      });
    }
    // tslint:disable-next-line:semicolon
  };

  // [최적화]
  shouldComponentUpdate(nextProps: object, nextState: object) {
    return nextState !== nextProps;
  }

  render() {
    return (
      <Container className="post">
        <Row className="post-big-logo">
          <Col>
            <h1>Post</h1>
          </Col>
        </Row>
        <Row className="post-area">
          <Col>
            <Button
              block={true}
              name="addShowNone"
              outline={true}
              color="primary"
              onClick={this.handleShowNone}
            >
              포스트 추가하기!
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* 포스트 추가 */}
            {this.state.addShowNone && (
              <Add
                category={this.props.category}
                formats={this.formats}
                modules={this.modules}
              />
            )}
          </Col>
        </Row>
        <Row className="post-area">
          <Col>
            <Button
              block={true}
              name="changeShowNone"
              outline={true}
              color="info"
              onClick={this.handleShowNone}
            >
              포스트 변경하기!
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* 포스트 변경 */}
            {this.state.changeShowNone && (
              <Change
                handleSearchCategorysPost={this.handleSearchCategorysPost}
                category={this.props.category}
                formats={this.formats}
                modules={this.modules}
                posts={this.state.posts}
              />
            )}
          </Col>
        </Row>
        <Row className="post-area">
          <Col>
            <Button
              block={true}
              name="deleteShowNone"
              outline={true}
              color="danger"
              onClick={this.handleShowNone}
            >
              포스트 삭제하기!
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* 포스트 삭제 */}
            {this.state.deleteShowNone && (
              <Delete
                handleSearchCategorysPost={this.handleSearchCategorysPost}
                category={this.props.category}
                formats={this.formats}
                modules={this.modules}
                posts={this.state.posts}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Post;

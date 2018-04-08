import * as React from 'react';
import './Post.css';
import { Container, Row, Col, Button } from 'reactstrap';
// 마크다운 에디터 테마 & 코드 하이라이팅 모듈 불러오기
import 'react-quill/dist/quill.snow.css'; // ES6
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/atom-one-dark.css';
// 포스트 추가 모듈 불러오기
import Add from './../Post/PostAdd/Add';

interface ButtonChange {
  currentTarget: { name: string };
}

interface Category {
  category: string;
}
class Post extends React.Component<
  { loadCategory: Function; category: Array<Category> },
  {}
> {
  state = {
    addShowNone: false,
    changeShowNone: false,
    deleteShowNone: false
  };

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
    'video'
  ];

  modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    },
    syntax: true
  };

  // [공통] 입력값 업데이트
  handleShowNone = (e: ButtonChange) => {
    this.setState({
      [e.currentTarget.name]: !this.state[e.currentTarget.name]
    });
    console.log(this.state[e.currentTarget.name]);
    // tslint:disable-next-line:semicolon
  };

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
                loadCategory={this.props.loadCategory}
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
              /*<Add
                loadCategory={this.props.loadCategory}
                category={this.props.category}
              />*/
              <p />
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
              /*<Add
                loadCategory={this.props.loadCategory}
                category={this.props.category}
              />*/
              <p />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Post;

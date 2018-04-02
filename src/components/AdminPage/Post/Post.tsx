import * as React from 'react';
import './Post.css';
import { Container, Row, Col } from 'reactstrap';
import Add from './../Post/PostAdd/Add';

class Post extends React.Component<{}, {}> {
  render() {
    return (
      <Container className="post">
        <Row className="post-big-logo">
          <Col>
            <h1>Post</h1>
          </Col>
        </Row>
        <Row className="post-small-logo">
          <Col>
            <p>포스트 추가</p>
          </Col>
        </Row>
        <Row className="post-small-logo">
          <Col>
            <Add />
          </Col>
        </Row>
        <Row className="post-small-logo">
          <Col>
            <p>포스트 변경</p>
          </Col>
        </Row>
        <Row className="post-small-logo">
          <Col>
            <p>포스트 삭제</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Post;

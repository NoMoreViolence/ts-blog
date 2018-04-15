import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Category from './Category/AdminCategory';
import Post from './Post/AdminPost';
// import Post from './Post/Post';

class AdminPage extends React.Component<
  { loadCategory: Function, category: Array<Category> },
  {}
> {
  shouldComponentUpdate(nextProps: {}, nextState: {}) {
    return nextProps !== this.state;
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            {/* 카테고리 추가, 변경, 삭제 부분 */}
            <Category
              loadCategory={this.props.loadCategory}
              category={this.props.category}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* 포스트 추가, 변경, 삭제 부분 */}
            <Post category={this.props.category} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminPage;

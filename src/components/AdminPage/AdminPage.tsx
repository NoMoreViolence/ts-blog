import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Category from './Category/Category';

class AdminPage extends React.Component<{}, {}> {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            {/* 카테고리 추가, 변경, 삭제 부분 */}
            <Category />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminPage;

import * as React from 'react';
import Add from './CategoryAdd/Add';
import Change from './CategoryChange/Change';
import Delete from './CategoryDelete/Delete';
import './Category.css';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

// 현재 카테고리 데이터 가져오기
interface Category {
  category: string;
  hello: boolean;
}

class Category extends React.Component<
  { loadCategory: Function; category: Array<Category> },
  {}
> {
  state = {
    category: [], // $전체 카테고리 데이터 불러와서 보여줄 카테고리 배열$
    categoryChangeDropdown: false
  };

  render() {
    const { category } = this.props;

    const CurrentCategoryMain = (data: Array<Category>) => {
      return data.map((object, i) => {
        return <BreadcrumbItem key={i}>{object.category}</BreadcrumbItem>;
      });
    };

    return (
      <div>
        <Container className="category">
          <Row className="category-big-logo">
            <Col>
              <h1>Category</h1>
            </Col>
          </Row>
          <Row className="category-small-logo">
            <Col>
              <p>현재 카테고리</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem />
                {CurrentCategoryMain(category)}
                <BreadcrumbItem />
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="category-small-logo">
            <Col>
              <p className="input">카테고리 추가</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* 카테고리 추가 */}
              <Add loadCategory={this.props.loadCategory} />
            </Col>
          </Row>
          <Row className="category-small-logo">
            <Col>
              <p className="change">카테고리 변경</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* 카테고리 변경 */}
              <Change
                category={category}
                loadCategory={this.props.loadCategory}
              />
            </Col>
          </Row>
          <Row className="category-small-logo">
            <Col>
              <p className="delete">카테고리 삭제</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* 카테고리 삭제 */}
              <Delete
                category={category}
                loadCategory={this.props.loadCategory}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Category;

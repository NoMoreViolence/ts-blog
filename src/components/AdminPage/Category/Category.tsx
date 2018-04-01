import * as React from 'react';
import './Category.css';
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Form
} from 'reactstrap';

// 알림
import { toast } from 'react-toastify';

// 인풋 인터페이스
interface HandleChangeInterface {
  target: HTMLInputElement;
}

// 현재 카테고리 데이터 가져오기
interface Category {
  category: string;
}

class Category extends React.Component<{}, {}> {
  state = {
    addValue: '', // 카테고리 추가 state
    category: [] // 카테고리 데이터 불러와서 보여줄 카테고리 State
  };

  // 입력값 업데이트
  handleChange = (e: HandleChangeInterface) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // tslint:disable-next-line:semicolon
  };

  // 카테고리 추가 변경 삭제 이벤트 총집합
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form 이벤트 막기 및 이벤트 버블링 기
    e.preventDefault();
    // 카테고리 추가
    if (e.currentTarget.textContent === '카테고리 추가') {
      fetch('/api/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: sessionStorage.getItem('token'),
          category: this.state.addValue
        }),
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            addValue: ''
          });
          // 추가된 카테고리
          this.loadCategory();
          toast('"' + res.category + '"카테고리가 추가 되었습니다');
        })
        .catch((error: string) => {
          // tslint:disable-next-line:no-console
          console.log('카테고리 추가 실패');
          throw error;
        });
    }
    // tslint:disable-next-line:semicolon
  };

  // 카테고리 가져오기
  loadCategory = () => {
    fetch('/api/category/all', {
      method: 'GET',
      headers: {}
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          category: res.category
        });
      })
      .catch((error: string) => {
        // tslint:disable-next-line:no-console
        console.log('카테고리 데이터 가져오기 실패');
        throw error;
      });

    // tslint:disable-next-line:semicolon
  };

  // 카테고리 데이터 출력
  componentDidMount() {
    this.loadCategory();
  }

  render() {
    const { category, addValue } = this.state;

    const CurrentCategory = (data: Array<Category>) => {
      return data.map((object, i) => {
        return <BreadcrumbItem key={i}>{object.category}</BreadcrumbItem>;
      });
    };

    return (
      <Container className="category">
        <Row className="big-logo">
          <Col>
            <h1>Category</h1>
          </Col>
        </Row>
        <Row className="small-logo">
          <Col>
            <p>현재 카테고리</p>
          </Col>
        </Row>
        <Row className="">
          <Col>
            <Breadcrumb>
              <BreadcrumbItem />
              {CurrentCategory(category)}
              <BreadcrumbItem />
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="small-logo">
          <Col>
            <p>카테고리 추가</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <InputGroup>
                <Input
                  name="addValue"
                  value={addValue}
                  onChange={this.handleChange}
                />
                <Button outline={true} color="primary">
                  카테고리 추가
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row className="small-logo">
          <Col>
            <p>카테고리 변경</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup>
              <Input />
              <Button outline={true} color="info">
                카테고리 변경
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className="small-logo">
          <Col>
            <p>카테고리 삭제</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup>
              <Input />
              <Button outline={true} color="danger">
                카테고리 삭제
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Category;

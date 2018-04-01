import * as React from 'react';
import Change from './CategoryChange/Change';
import Delete from './CategoryDelete/Delete';
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
  Form,
  Dropdown
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

// 드롭 다운 선택자
interface Dropdown {
  currentTarget: { textContent: string };
}

class Category extends React.Component<{}, {}> {
  state = {
    category: [], // $전체 카테고리 데이터 불러와서 보여줄 카테고리 배열$
    addValue: '', // !추가할 카테고리!
    categoryChangeDropdown: false
  };

  // [공통] 카테고리 추가 변경 삭제 이벤트 총집합
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form 이벤트 막기 및 이벤트 버블링 기
    e.preventDefault();
    // tslint:disable-next-line:no-console
    console.log(e.currentTarget.textContent);
    // 카테고리 추가
    if (e.currentTarget.textContent === '카테고리 추가') {
      if (this.state.addValue !== '') {
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
            if (res.success === true) {
              // 추가된 카테고리
              this.loadCategory();
              toast('" ' + res.category + ' " 카테고리가 추가 되었습니다');
            } else {
              toast('입력값이 중복되었거나 없습니다');
            }
            // tslint:disable-next-line:no-console
            console.log(res.message);
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.log('카테고리 추가 실패');
            throw error;
          });
      } else {
        toast('글자를 입력해 주세요');
      }
    }
    // tslint:disable-next-line:semicolon
  };

  // [공통] 카테고리 가져오기
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

  // [공통]입력값 업데이트
  handleChange = (e: HandleChangeInterface) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // tslint:disable-next-line:semicolon
  };

  // [카테고리 변경] 카테고리 변경 토글
  handleCategoryChangeToggle = () => {
    this.setState({
      categoryChangeDropdown: !this.state.categoryChangeDropdown
    });
    // tslint:disable-next-line:semicolon
  };
  // [카테고리 변경] 카테고리 선택시 데이터 바꿔주기
  // tslint:disable-next-line:no-any
  handleChangeCurrentCategory = (e: Dropdown) => {
    // tslint:disable-next-line:no-console
    console.log(e.currentTarget.textContent);
    this.setState({ changeCurrentCategory: e.currentTarget.textContent });
    // tslint:disable-next-line:semicolon
  };

  // [공통] 카테고리 데이터 출력
  componentDidMount() {
    this.loadCategory();
  }

  render() {
    const { category, addValue } = this.state;

    const CurrentCategoryMain = (data: Array<Category>) => {
      return data.map((object, i) => {
        return <BreadcrumbItem key={i}>{object.category}</BreadcrumbItem>;
      });
    };

    return (
      <div>
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
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem />
                {CurrentCategoryMain(category)}
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
              <Change category={category} />
            </Col>
          </Row>
          <Row className="small-logo">
            <Col>
              <p>카테고리 삭제</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Delete category={category} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Category;

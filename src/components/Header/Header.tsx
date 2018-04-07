import * as React from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  Form,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';

import { NavLink } from 'react-router-dom';

// 알림
import { toast } from 'react-toastify';

// 인풋 인터페이스
interface HandleChangeInterface {
  target: HTMLInputElement;
}

interface Category {
  category: string;
}

class Header extends React.Component<
  { login: number; changeLogined: Function; category: Array<Category> },
  { message: string }
> {
  state = {
    message: ''
  };

  // 입력 state 업데이트
  handleChange = (e: HandleChangeInterface) => {
    this.setState({
      message: e.target.value
    });
    // tslint:disable-next-line:semicolon
  };

  // Header Form 이벤트
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.message !== '') {
      // 메시지 보내기
      fetch('/api/ripple/talk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: this.state.message
        }),
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            message: ''
          });
          toast('메시지가 전송 되었습니다 !');
        })
        .catch(error => {
          toast('이런, 알 수 없는 이유로 실패하고 말았어요');
          // tslint:disable-next-line:no-console
          console.log('메시지 보내기 실패');
          throw error;
        });
    }
    // tslint:disable-next-line:semicolon
  };

  // 로그아웃 이벤트
  signOut = () => {
    sessionStorage.clear();
    this.props.changeLogined(0);
    // tslint:disable-next-line:no-console
    console.log('로그아웃 하셨습니다 - Header.tsx');
    // tslint:disable-next-line:semicolon
  };

  render() {
    // 데이터 받아서 정렬
    const CurrentCategoryChangeBar = (data: Array<Category>) => {
      return data.map((object, i) => {
        const url = `/category/${object.category}`;
        return (
          <BreadcrumbItem key={i}>
            <NavLink to={url}>{object.category}</NavLink>
          </BreadcrumbItem>
        );
      });
    };

    return (
      <Container>
        <Row>
          <Col>
            <h1>
              <NavLink to="/">IHP Blog</NavLink>
            </h1>
          </Col>
          <Col>
            <Breadcrumb>
              <BreadcrumbItem />
              {CurrentCategoryChangeBar(this.props.category)}
              {this.props.login === 1 && (
                <BreadcrumbItem>
                  <NavLink to="/admin/post">관리자 페이지</NavLink>
                </BreadcrumbItem>
              )}
              {this.props.login === 1 && (
                <BreadcrumbItem>
                  <NavLink to="/" onClick={this.signOut}>
                    Sign out
                  </NavLink>
                </BreadcrumbItem>
              )}
              {this.props.login === 0 && (
                <BreadcrumbItem>
                  <NavLink to="/admin/login">관리자 로그인</NavLink>
                </BreadcrumbItem>
              )}
              <BreadcrumbItem active={true}>Category</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <InputGroup>
                <Input
                  placeholder="하고 싶은 말을 적어주세요!"
                  value={this.state.message}
                  onChange={this.handleChange}
                  name="search"
                />
                <Button color="primary">하고 싶은 말 보내기</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;

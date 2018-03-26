import * as React from 'react';
import { Button, Form, Input, Container, Row, Col } from 'reactstrap';
import './Login.css';

// html input 인터페이스
interface HandleChangeInterface {
  target: HTMLInputElement;
}

// App.tsx에서 받은 {...props} 안에 history 함수가 있었고, 그 함수 안에 push 함수가 있었는데 이를 정의해 줬다
// 난 이것만 쓸 거니까 일단 push만 해 줬다, 나중에 추가할거 생기면 또 하지 뭐
interface PropTypes {
  push: Function;
}

export default class Login extends React.Component<
  { changeLogined: Function; history: PropTypes },
  {}
> {
  state = {
    username: '',
    password: ''
  };

  // username, password 텍스트 변경 메소드
  handleChange = (e: HandleChangeInterface) => {
    // tslint:disable-next-line:no-console
    this.setState({
      [e.target.name]: e.target.value
    });
    // tslint:disable-next-line:semicolon
  };

  // 로그인을 했을 때 실행되는 메소드
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { username, password } = this.state;

    e.preventDefault();

    if (username !== '' && password !== '') {
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === true) {
            // 로그인 성공
            localStorage.setItem('token', res.token);
            this.props.changeLogined(1);
            // tslint:disable-next-line:no-console
            console.log('로그인 성공');
            this.props.history.push('/');
          }
        })
        .catch(function(error: string) {
          throw error;
        });

      this.setState({
        username: '',
        password: ''
      });
    }
    // tslint:disable-next-line:semicolon
  };

  render() {
    const { username, password } = this.state;

    // 레이아웃
    return (
      <Container className="login-form">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button outline={true} color="primary" size="lg" disabled={true}>
              Admin Login
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={this.handleSubmit}>
              <Input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <Button color="primary" size="lg" block={true}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

import * as React from 'react';
import './Login.css';

interface State {
  username: string;
  password: string;
}

// 인풋 인터페이스
interface HandleNameChangeInterface {
  target: HTMLInputElement;
}

class Login extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    // 이벤트 바인딩
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.login = this.login.bind(this);
  }

  // JWT 토큰 발급용 로그인
  login() {
    // URL
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      mode: 'cors'
    })
      // tslint:disable-next-line:no-any
      .then(res => res.json())
      .then(res => {
        // 로그인 성공 실패 콘솔 출력
        // tslint:disable-next-line:no-console
        console.log(res);
        // 로컬 스토리지에 토큰 값을 저장합니다 로그인이 성공했을 때만
        localStorage.setItem('token', JSON.stringify(res.token));
      })
      .catch(function(error: string) {
        throw error;
      });
  }

  // 유저네임 state 업데이트
  handleChangeUsername(e: HandleNameChangeInterface) {
    this.setState({
      username: e.target.value
    });
  }
  // 비밀번호 state 업데이트
  handleChangePassword(e: HandleNameChangeInterface) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <div className="login">
        <h2 className="login-header">Log in</h2>

        <div className="login-container">
          <p>
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChangeUsername}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </p>
          <p>
            <input type="submit" value="Log in" onClick={this.login} />
          </p>
        </div>
      </div>
    );
  }
}

export default Login;

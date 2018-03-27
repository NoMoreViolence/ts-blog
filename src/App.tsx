// 모듈
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as React from 'react';

// 컴포넌트들
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Login from './components/Login/Login';

// 알림
import { ToastContainer, toast } from 'react-toastify';

// 으어어어어리액트야
class App extends React.Component<{}, {}> {
  state = {
    logined: 0
  };

  handleUpdate = (num: number) => {
    this.setState({
      logined: num
    });
    // 상태 바
    this.notify(num);
    // tslint:disable-next-line:semicolon
  };

  // 상태 바
  notify = (num: number) =>
    // tslint:disable-next-line:semicolon
    toast(
      num === 1 ? '관리자 권한 상태입니다' : '관리자 권한 획득 실패 or 로그아웃'
      // tslint:disable-next-line:semicolon
    );

  // 토큰값 받아서 관리자 상태일 경우 관리자 메뉴 카테고리 출력
  HandleCheck = () => {
    // 일단 토큰 값이존재할 때만
    if (localStorage.getItem('token') !== null) {
      fetch('/api/auth/check', {
        method: 'GET',
        headers: {
          'x-access-token': `${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            // tslint:disable-next-line:no-console
            console.log('현재 관리자 상태 - App.tsx');
            this.notify(1);
            this.setState({
              logined: 1
            });
          } else {
            // tslint:disable-next-line:no-console
            console.log('비 정상적인 토큰 감지 - App.tsx');
            this.notify(0);
          }
        })
        .catch((error: string) => {
          // tslint:disable-next-line:no-console
          console.log('로그인 실패, or 인증 실패');
          throw error;
        });
    } else {
      toast('환영합니다!');
    }
    // tslint:disable-next-line:semicolon
  };

  // 모든 컴포넌트 출력된 후 확인
  componentDidMount() {
    this.HandleCheck();
  }

  render() {
    const { logined } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <ToastContainer />
          <Header login={logined} changeLogined={this.handleUpdate} />
          <Switch>
            {/* <Route exact={true} path="/" component={Main}/> */}
          </Switch>
          {/* 검색결과 <Route exact={true} path="/search/:what" component={SearchResult} /> */}
          <Switch>
            {/* 어드민 페이지 로그인 jwt 토큰 받을 때 */}
            <Route
              name="login"
              exact={true}
              path="/admin/login"
              render={props => (
                <Login changeLogined={this.handleUpdate} {...props} />
              )}
            />
            {/* 어드민 페이지에서 post, 로그인한 사용자만 접근 가능하게 만들었음 */}
            {logined === 1 && (
              <Route exact={true} path="/admin/post" component={Content} />
            )}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// 모듈
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import './App.css';

// 컴포넌트들
import Header from './components/Header/Header';
import AdminPage from './components/AdminPage/AdminPage';
import Login from './components/Login/Login';
import Main from './components/MainPage/Main';

// 알림
import { ToastContainer, toast } from 'react-toastify';

// 으어어어어리액트야
class App extends React.Component<{}, {}> {
  state = {
    logined: 0, // 로그인 확인 변수
    category: [], // 모든 카테고리
    allPost: [], // 모든 포스트의 타이틀, 부제목, 카테고리
  };

  handleUpdate = (num: number) => {
    this.setState({
      logined: num,
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

  // [로그인 체크]
  handleCheck = () => {
    // 일단 토큰 값이존재할 때만
    if (sessionStorage.getItem('token') !== null) {
      fetch('/api/auth/check', {
        method: 'GET',
        headers: {
          'x-access-token': `${sessionStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            // tslint:disable-next-line:no-console
            console.log('현재 관리자 상태 - App.tsx');
            this.notify(1);
            this.setState({
              logined: 1,
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

  // [공통] 카테고리 가져오기
  loadCategory = () => {
    fetch('/api/category/all', {
      method: 'GET',
      headers: {},
    })
      .then(res => res.json())
      .then(res => {
        if (res.success === true) {
          this.setState({
            category: res.category,
          });
        }
      })
      .catch((error: string) => {
        // tslint:disable-next-line:no-console
        console.log('카테고리 데이터 가져오기 실패');
        throw error;
      });

    // tslint:disable-next-line:semicolon
  };

  // 모든 포스트의 타이틀, 카테고리, 부제목만 불러옴
  handlePostTitleAndSubTitle = () => {
    console.log('메인 페이지 포스트 로딩 시작');
    fetch(`/api/post/allPosts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log('메인 페이지 포스트 로딩 성공');
        this.setState({
          allPost: res.result,
        });
      })
      .catch(error => {
        console.log('메인 페이지 포스트 로딩 실패 - > 서버의 오류');
        console.log(error.message);
        toast('서버에서 데이터를 불러오는 도중 에러 발생');
      });
    // tslint:disable-next-line:semicolon
  };

  // 모든 컴포넌트 출력된 후 확인
  componentDidMount() {
    // 관리자 로그인 체크
    this.handleCheck();
    // 카테고리 로딩
    this.loadCategory();
    // 메인 페이지 포스트 로딩
    this.handlePostTitleAndSubTitle();
  }

  // componentDidUpdate
  componentDidUpdate(prevProps: object, prevState: object) {
    // hello
  }

  // scu
  shouldComponentUpdate(nextProps: {}, nextState: {}) {
    return nextState !== this.state;
  }

  render() {
    const { logined, allPost, category } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          {/* 알림 보여주는 HTML 태크, 이것만 해 놓으면 알림 뜰때 자동으로 생겼다가 사라짐 */}
          <ToastContainer />
          {/* 헤더 */}
          <Header
            login={logined}
            changeLogined={this.handleUpdate}
            category={category}
            handlePostTitleAndSubTitle={this.handlePostTitleAndSubTitle}
          />
          <Switch>
            {/* 메인 페이지 */}
            <Route
              exact={true}
              path="/"
              render={props => <Main allPost={allPost} />}
            />
          </Switch>
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
              <Route
                exact={true}
                path="/admin/post"
                render={props => (
                  <AdminPage
                    loadCategory={this.loadCategory}
                    category={category}
                    {...props}
                  />
                )}
              />
            )}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

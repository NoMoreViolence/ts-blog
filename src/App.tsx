// 모듈
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as React from 'react';

// 컴포넌트들
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Login from './components/Login/Login';

// 으어어어어리액트야
class App extends React.Component<{}, {}> {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            {/* <Route exact={true} path="/" component={Main}/> */}
          </Switch>
          {/* 검색결과 <Route exact={true} path="/search/:what" component={SearchResult} /> */}
          <Switch>
            {/* 어드민 페이지 로그인 jwt 토큰 받을 때 */}
            <Route exact={true} path="/admin/login" component={Login} />
            {/* 어드민 페이지에서 post */}
            <Route exact={true} path="/admin/post" component={Content} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

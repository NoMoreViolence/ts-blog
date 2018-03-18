// 리액트 라우터 돔 사용 URL 전환 위해
// import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as React from 'react';
// mobx 모듈
// 오토바인드
import autobind from 'autobind-decorator';
import { observer, inject } from 'mobx-react';
import './App.css';
// 인덱스에서 만들어진 스토어를 온다, Mobx의 좋은 점은 리덕스와 달리 스토어를 한 개로 제한하지 않는다. 모든 것을 한 Store에 밀어넣을 필요가 없어졌다
import { Store } from './index';
// 컴포넌트 추가
import Header from './components/Header/Header';
import Content from './components/Content/Content';

// Store를 생성 할 때는 앞에 물음표를 붙인다
interface Props {
  store?: Store;
}

@inject('store')
@observer
class App extends React.Component<Props, {}> {
  render() {
    const store = this.props.store as Store;
    return (
      <div className="App">
        <Header />
        <Content />
        <p>{JSON.stringify(store.test)}</p>
        <button onClick={this.click}>추가</button>
      </div>
    );
  }
  @autobind
  click() {
    const store = this.props.store as Store;
    store.add();
  }
}

export default App;

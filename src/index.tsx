import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// Mobx 쓰기ㅡ위해 추가
import { observable, action, configure } from 'mobx';
import { Provider } from 'mobx-react';
// useStrict(true) 대신에 이걸 사용하라고 업데이트가 되서 이걸 사용중, 중요한건 이 구문을 왜 적는지 모르겠다....
configure({ enforceActions: true });

// 임시 연습용 스토어 추가
export class Store {
  @observable test: number[] = [];
  @action
  add(): void {
    this.test.push(Math.round(Math.random() * 100));
  }
}

const store = new Store();

// 렌더링
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

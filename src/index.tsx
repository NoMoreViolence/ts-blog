import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// 부~트~스~트~랩~css지롱~
import 'bootstrap/dist/css/bootstrap.css';
// 마크다운 에디터 쓸 때 필요한 모듈들 and CSS
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';
import 'react-mde/lib/styles/css/react-mde-preview.css';

// 렌더링
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();

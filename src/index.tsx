import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// react-mde
import 'react-mde/lib/styles/css/react-mde-all.css';
// BootStrap
import 'bootstrap/dist/css/bootstrap.min.css';

// 렌더링
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();

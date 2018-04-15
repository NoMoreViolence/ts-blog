import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// BootStrap
import 'bootstrap/dist/css/bootstrap.min.css';

// 렌더링
ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();

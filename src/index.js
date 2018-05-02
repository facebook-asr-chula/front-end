import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyRecorder from './component/MyRecorder.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyRecorder />, document.getElementById('root'));
registerServiceWorker();

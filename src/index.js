import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import store from "./redux/store";

// ReactDOM.render(<App />, document.getElementById('root1'))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root1')
);
registerServiceWorker();

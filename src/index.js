import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

const store = createStore(reducer)
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

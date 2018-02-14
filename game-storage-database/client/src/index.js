import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './redux';
import thunk from 'redux-thunk';

import App from './main/App';

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(()=>{
  console.log(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>, document.getElementById('root'));

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from './reducers';
import './index.scss';
import { ILogin } from './types/types';
import { User } from './model/user';
import configureStore from './configureStore';

export type TStoreState = {
  user: User;
  userList: User[],
}

const storeState = {
  user: new User({
    username: 'test',
    email: 'test@test.com'
  }),
  userList: []
}

const store = configureStore(storeState)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// @ts-ignore
if (module.hot) {
// @ts-ignore
  module.hot.accept();
}
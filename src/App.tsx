import React, { Component } from 'react';
import { Input } from 'antd'
import loadable from '@loadable/component';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomeLayout from './components/layout';

const HomeComponent = loadable(() => import('./views/Home'))
const RegistComponent = loadable(() => import('./views/Regist'))

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router history={history}>
          <HomeLayout>
            <Route exact path="/" component={HomeComponent}></Route>
            <Route path="/regist" component={RegistComponent}></Route>
          </HomeLayout>
        </Router>
      </div>
    );
  }
}

export default App;

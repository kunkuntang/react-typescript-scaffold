import React, { Component } from 'react';
import { Input } from 'antd'
import loadable from '@loadable/component';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const HomeComponent = loadable(() => import('./views/Home'))
const AboutComponent = loadable(() => import('./views/About'))

// const Img = require('./assets/img/img.jpeg')
class App extends Component {
  render() {
    return (
      <div className="app">
        Hello React
        {/* <img src={Img} /> */}
        {/* <img src="/src/asset/img.jpeg" alt=""/> */}
        <Router history={createBrowserHistory()}>
          <ul>
            <li>
              <Link to="/">To Home</Link>
            </li>
            <li>
              <Link to="/about">To About</Link>
            </li>
          </ul>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route path="/about" component={AboutComponent}></Route>
        </Router>
        <p className="aps">hahahahahahahhahaha</p>
      </div>
    );
  }
}

export default App;

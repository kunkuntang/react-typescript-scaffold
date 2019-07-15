import React, { Component } from 'react';
import loadable from '@loadable/component';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import HomeLayout from './components/layout';

const HomeComponent = loadable(() => import('./views/Home'))
const RegistComponent = loadable(() => import('./views/Regist'))

const routerBaseUrl = process.env.BASEURL

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter basename={routerBaseUrl}>
          <HomeLayout>
            <Route exact path="/" component={HomeComponent}></Route>
            <Route path="/regist" component={RegistComponent}></Route>
          </HomeLayout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

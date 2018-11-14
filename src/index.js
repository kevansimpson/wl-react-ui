import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './components/About';
import Login from './components/Login';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function requireAuth(nextState, replaceState) {
  console.log('REQUIRE AUTH');
  if (true) {
    window.location = 'winelist'
//    replaceState({
//      pathname: '/login',
//      state: { nextPathname: nextState.location.pathname }
//    })
  }
}

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route path="/about" component={About}/>
      <Route path="/winelist" component={App} onEnter={requireAuth}/>
    </div>
  </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

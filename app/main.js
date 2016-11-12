'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {connect, Provider} from 'react-redux'
import io from 'socket.io-client'

import store from './reducers/index.js'

import Home from './components/home.js'
import App from './components/app.js'
import TweetContainer from './components/recent.js'
import Cloud from './components/cloud.js'

// import { start } from './reducers/time.js'
// import { receiveNewTweet } from './reducers/tweets'
import SocketConnect from './socket-connect'

// const socket = io(window.location.origin);

// const onAppEnter = () => {
//   store.dispatch(start())
//   store.dispatch(createSocket(socket))
// }



ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={SocketConnect}>
          <IndexRedirect to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/recent" component={TweetContainer} />
          <Route path="/cloud" component={Cloud} />
        </Route>
      </Router>
    </Provider>,
  document.getElementById('app')
);

'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {connect, Provider} from 'react-redux'
import io from 'socket.io-client'

import store from './reducers/index'

import Home from './components/home'
import App from './components/app'
import TweetContainer from './components/recent'
import Cloud from './components/cloud'
import Volume from './components/volume'
import Location from './components/location'

import { receiveNewTweet } from './reducers/tweets'
import { setSocket } from './reducers/socket'

const socket = io(window.location.origin);

// set up listeners
socket.on('connect', function(){
  console.log('connected to server!');
})
socket.on('tweet', function(tweet){
  store.dispatch(receiveNewTweet(tweet))
})

const onAppEnter = () => {
  store.dispatch(setSocket(socket))
}



ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={onAppEnter}>
          <IndexRedirect to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/recent" component={TweetContainer} />
          <Route path="/cloud" component={Cloud} />
          <Route path="/volume" component={Volume} />
          <Route path="/location" component={Location} />
        </Route>
      </Router>
    </Provider>,
  document.getElementById('app')
);

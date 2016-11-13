import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { tweetsReducer } from './tweets'
import { tweetCountReducer } from './tweetcount'
import { sessionReducer } from './session'
import { cloudReducer } from './cloud'
import { locationReducer } from './location'
import { socketReducer } from './socket'

const rootReducer = combineReducers({
  tweetCount: tweetCountReducer,
  tweets: tweetsReducer,
  session: sessionReducer,
  cloud: cloudReducer,
  location: locationReducer,
  socket: socketReducer
})

const loggerMiddleware = createLogger()
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)

const store = createStore(rootReducer, middleware);

export default store

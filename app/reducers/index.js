import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { tweetsReducer } from './tweets'
import { sessionReducer } from './session'
import { tweetCountReducer } from './tweetcount'
import { cloudReducer } from './cloud'
import { locationReducer } from './location'
import { socketReducer } from './socket'


/* ------------------- CREATING REDUX STORE ------------------ */

const rootReducer = combineReducers({
  tweets: tweetsReducer,
  tweetCount: tweetCountReducer,
  session: sessionReducer,
  cloud: cloudReducer,
  locations: locationReducer,
  socket: socketReducer
})

const loggerMiddleware = createLogger()
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)

const store = createStore(rootReducer, middleware);

export default store

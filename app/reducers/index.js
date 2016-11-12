import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { tweetsReducer } from './tweets'
import { tweetCountReducer } from './tweetcount'
import { timeReducer } from './time'
import { cloudReducer } from './cloud'
import { locationReducer } from './location'

const rootReducer = combineReducers({
  tweetCount: tweetCountReducer,
  tweets: tweetsReducer,
  time: timeReducer,
  cloud: cloudReducer,
  location: locationReducer
})
const loggerMiddleware = createLogger()
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)

const store = createStore(rootReducer, middleware);

export default store

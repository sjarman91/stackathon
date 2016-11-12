import axios from 'axios'

const NEW_TWEET = 'NEW_TWEET'

const initialCount = 0

export const tweetCountReducer = function(state = initialCount, action) {
  switch(action.type) {
    case NEW_TWEET:
      return state + 1

    default: return state;
  }
}

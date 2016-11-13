const NEW_TWEET = 'NEW_TWEET'

const initialData = []

export const receiveNewTweet = tweet => {
  return {type: NEW_TWEET, tweet}
}

export const tweetsReducer = function(state = initialData, action) {
  switch(action.type) {
    case NEW_TWEET:
      return [action.tweet, ...state.slice(0, 99)]

    default: return state;
  }
}

const NEW_TWEET = 'NEW_TWEET'

const initialData = []

export const receiveNewTweet = tweet => {
  tweet.inCloud = false
  return {type: NEW_TWEET, tweet}
}

export const tweetsReducer = function(state = initialData, action) {
  switch(action.type) {
    case NEW_TWEET:
      let slicedState = state.slice(0, 99)
      return [action.tweet, ...slicedState]

    default: return state;
  }
}

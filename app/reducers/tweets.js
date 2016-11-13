/* ------------------------------ CONSTANTS ----------------------------- */

const NEW_TWEET = 'NEW_TWEET'
const START_SESSION = 'START_SESSION'
const initialData = []


/* --------------------------- TWEETS REDUCER -------------------------- */

export const receiveNewTweet = tweet => {
  return {type: NEW_TWEET, tweet}
}

export const tweetsReducer = function(state = initialData, action) {
  switch(action.type) {
    case NEW_TWEET:
      return [action.tweet, ...state.slice(0, 99)]

    case START_SESSION:
      return []

    default: return state;
  }
}

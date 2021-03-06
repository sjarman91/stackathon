/* ------------------------------ CONSTANTS ----------------------------- */

const NEW_TWEET = 'NEW_TWEET'
const START_SESSION = 'START_SESSION'
const initialCloud = {}

/* ---------------------------- CLOUD REDUCER --------------------------- */

export const cloudReducer = function(state = initialCloud, action) {
  switch(action.type) {

    case NEW_TWEET:
      return Object.assign({}, addTweetToCloud(action.tweet, state))

    case START_SESSION:
      return {}

    default: return state;
  }
}


/* ------------------- TEXT PARSING FUNCTION FOR CLOUD ------------------ */

function addTweetToCloud(tweet, state) {
  if (tweet.text) {
    if(tweet.text.slice(0,2) === 'RT') {
        if(state[tweet.text]) {
          state[tweet.text] = state[tweet.text] + 1
        }
        else {
          state[tweet.text] = 1
        }
    } else {
      tweet.text.split(" ").forEach(word => {
        if(word.length > 5) {
          word = word.toLowerCase();
          if(state[word]) {
            state[word] = state[word] + 1
          }
          else {
            state[word] = 1
          }
        }
      })
    }
  }
  return state
}

/* ------------------------------ CONSTANTS ----------------------------- */

const NEW_TWEET = 'NEW_TWEET'
const initialCloud = {}
const useless = ['the', 'is', 'on', 'in', 'of', 'with', 'to', 'at',
                 'and', 'a', 'up', 'for', 'will', 'this', 'that', 'out']


/* ---------------------------- CLOUD REDUCER --------------------------- */

export const cloudReducer = function(state = initialCloud, action) {
  switch(action.type) {

    case NEW_TWEET:
      return Object.assign({}, addTweetToCloud(action.tweet, state))

    default: return state;
  }
}


/* ------------------- TEXT PARSING FUNCTION FOR CLOUD ------------------ */

function addTweetToCloud(tweet, state) {
  if (tweet.text) {
    tweet.text.split(" ").forEach(word => {
      if(useless.indexOf(word) === -1) {
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
  return state
}

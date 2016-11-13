/* ------------------------------ CONSTANTS ----------------------------- */

const NEW_TWEET = 'NEW_TWEET'
const START_SESSION = 'START_SESSION'
const initialCount = 0;


/* ------------------------- TWEET COUNT REDUCER ------------------------ */

export const tweetCountReducer = function(state = initialCount, action) {
  switch(action.type) {
    case NEW_TWEET:
      return state + 1

    case START_SESSION:
      return 0

    default: return state;
  }
}

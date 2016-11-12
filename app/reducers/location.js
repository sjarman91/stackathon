const NEW_TWEET = 'NEW_TWEET'

const initialLocations = []

export const locationReducer = function(state = initialLocations, action) {
  switch(action.type) {

    case NEW_TWEET:
      if(action.tweet.coordinates) {
         return [...state, action.tweet.coordinates]
      } else {
        return state
      }

    default: return state;
  }
}

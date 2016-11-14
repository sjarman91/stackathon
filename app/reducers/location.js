/* ------------------------------ CONSTANTS ----------------------------- */

const NEW_TWEET = 'NEW_TWEET'
const initialLocations = [{
                name: "shane's house",
                lat: 26.6,
                lon: -80.4
            }]

/* -------------------------- LOCATION REDUCER ------------------------- */

export const locationReducer = function(state = initialLocations, action) {
  switch(action.type) {

    case NEW_TWEET:
      if (action.tweet.coordinates) {
         return [...state, {name: action.tweet.user, lat: action.tweet.coordinates[0], lon: action.tweet.coordinates[1]}]
      } else {
        return state
      }

    default: return state;
  }
}

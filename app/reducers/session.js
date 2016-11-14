/* ------------------------------ CONSTANTS ----------------------------- */

const START_SESSION = 'START_SESSION'
const END_SESSION = 'END_SESSION'
const NEW_TWEET = 'NEW_TWEET'
const ADD_SAMPLE = 'ADD_SAMPLE'
const CHANGE_TOPIC = 'CHANGE_TOPIC'
const initialSession = { start: 0,
                         current: 0,
                         samples: [],
                         topic: 'East Coast - Geotagged',
                         active: false
                       }


/* --------------------------- ACTION CREATORS -------------------------- */

export const start = () => ({type: START_SESSION})
export const end = () => ({type: END_SESSION})
export const addSample = (sample) => ({type: ADD_SAMPLE, sample})
export const changeTopic = (topic) => ({type: CHANGE_TOPIC, topic})


/* --------------------------- SESSION REDUCER -------------------------- */


export const sessionReducer = function(state = initialSession, action) {
  switch(action.type) {

    case START_SESSION:
      return Object.assign({}, state, {active: true, start: Date.now(), samples: [], current: Date.now()})

    case END_SESSION:
      return Object.assign({}, state, {active: false})

    case CHANGE_TOPIC:
      return Object.assign({}, state, {topic: action.topic})

    case ADD_SAMPLE:
      return Object.assign({}, state, {samples: [...state.samples, action.sample]})

    case NEW_TWEET:
      return Object.assign({}, state, {current: Date.now()})


    default: return state;
  }
}

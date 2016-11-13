import axios from 'axios'

const START_SESSION = 'START_SESSION'
// const END_SESSION = 'END_SESSION'
const NEW_TWEET = 'NEW_TWEET'
const ADD_SAMPLE = 'ADD_SAMPLE'

export const start = () => ({type: START_SESSION})
export const addSample = () => ({type: START_SESSION, sample})
// export const end = () => ({type: END_SESSION})

const initialSession = {start: 0, current: 0, samples: []}

export const sessionReducer = function(state = initialSession, action) {
  switch(action.type) {

    case START_SESSION:
      state.start = Date.now()
      return state

    case ADD_SAMPLE:
      state.samples.push(action.sample)
      return state

    case NEW_TWEET:
      state.current = Date.now()
      return state

    default: return state;
  }
}

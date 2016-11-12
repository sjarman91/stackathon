import axios from 'axios'

const START = 'START'
const UPDATE_TIME = 'UPDATE_TIME'
const NEW_TWEET = 'NEW_TWEET'

export const start = () => ({type: START})
export const updateTime = () => ({type: UPDATE_TIME})

const initialTimes = {start: 0, current: 0}

export const timeReducer = function(state = initialTimes, action) {
  switch(action.type) {

    case START:
      state.start = Date.now()
      return state

    case NEW_TWEET:
      if (!state.start) {state.start = Date.now()}
      state.current = Date.now()
      return state

    default: return state;
  }
}

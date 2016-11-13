/* ------------------------------ CONSTANTS ----------------------------- */

const SET_SOCKET = 'SET_SOCKET';
const initialState = {};

/* --------------------------- ACTION CREATORS -------------------------- */

export const setSocket = socket => ({ type: SET_SOCKET, socket });


/* --------------------------- SOCKET REDUCER -------------------------- */


export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return action.socket;

    default: return state;
  }
};

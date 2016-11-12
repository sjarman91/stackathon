import axios from 'axios'

const NEW_TWEET = 'NEW_TWEET'

const initialCloud = {}

export const cloudReducer = function(state = initialCloud, action) {
  switch(action.type) {

    case NEW_TWEET:
      let textArr = action.tweet.text.split(" ")
      const useless = ['the', 'is', 'on', 'in', 'of', 'with', 'to', 'at', 'and', 'a', 'up', 'for', 'will', 'this', 'that', 'out']
      textArr.forEach(word => {
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
      return state

    default: return state;
  }
}

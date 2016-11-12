import io from 'socket.io-client'
import { receiveNewTweet } from './reducers/tweets'
import { start } from './reducers/time.js'
import store from './reducers/index.js'

// import { start } from './reducers/time.js'
// import { receiveNewTweet } from './reducers/tweets'

const socket = io(window.location.origin);

let val = 0

const SocketConnect = () => {
  store.dispatch(start())

  socket.on('connect', function(){
    console.log('I have made a persistent two-way connection to the server!');

    socket.on('tweet', function(tweet){
      tweet.id = val++
      store.dispatch(receiveNewTweet(tweet))
    })
  })

}


export default SocketConnect

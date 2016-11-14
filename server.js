'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const volleyball = require('volleyball');
const http = require('http');
const socketio = require('socket.io');
const Twitter = require('twitter');
const credentials = require('./server/credentials')

/* ------------------ EXPRESS / SOCKET SETUP ---------------------- */

const app = express();
const server = http.createServer();

server.on('request', app);

const io = socketio(server);

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/public', express.static('public'));
app.use('/api', require('./server/api'))

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

/* -------------------- CUSTOM LISTENERS ----------------------- */

const StreamListener = require('./server/stream-listener')
const streamListeners = {}


/* ---------------------- INITIAL TRACK -------------------------- */
// let tweetId = 0
// let coor = 0
// let track = {track: 'cowboys'}
// const client = new Twitter(credentials);

// let stream = client.stream('statuses/filter', track);

// stream.on('error', function(error) {
//   throw error;
// });

// stream.on('data', function(tweet) {
//   console.log('tweet received')
//   let userName = tweet.user ? tweet.user.name : 'anonymous';
//   let userPop = tweet.user ? tweet.user.followers_count : 0;
//   let parsedTweet = {id: tweetId++,
//                      text: tweet.text,
//                      coordinates: tweet.coordinates,
//                      user: userName,
//                      userPop: userPop
//                    }
//   if (parsedTweet.coordinates) {console.log(coor++)}

//   for (let listener in streamListeners) {
//     if (streamListeners[listener].sendData) {
//       streamListeners[listener].emitTweet(parsedTweet)
//     }
//   }

// });

/* ----------------------- SWITCH TRACKS --------------------------- */

// function switchTrack(newTrack) {
//   stream.destroy()
//   stream = client.stream('statuses/filter', {track: newTrack});

//   stream.on('error', function(error) {
//     throw error;
//   });

//   stream.on('data', function(tweet) {
//     console.log('tweet received')
//     let userName = tweet.user ? tweet.user.name : 'anonymous';
//     let userPop = tweet.user ? tweet.user.followers_count : 0;
//     let parsedTweet = {id: tweetId++,
//                        text: tweet.text,
//                        coordinates: tweet.coordinates,
//                        user: userName,
//                        userPop: userPop
//                      }

//     for (let listener in streamListeners) {
//       if (streamListeners[listener].sendData) {
//         streamListeners[listener].emitTweet(parsedTweet)
//       }
//     }
//   });
// }

/* ----------------------- TEST DATA --------------------------- */

let tweetId = 0
setInterval(function() {
    console.log('fake tweet created')
    let wordArr = ['sup', 'bro', 'whatup boss the bro']

    let parsedFakeTweet = {text: wordArr[Math.floor(Math.random() * 3)],
                           coordinates: [0, 1],
                           user: 'billy bob',
                           userPop: 1,
                           id: tweetId++
                         }

    for (let listener in streamListeners) {
      if (streamListeners[listener].sendData) {
        streamListeners[listener].emitTweet(parsedFakeTweet)
      }
    }
  }, 5000)

/* ------------------- SOCKET MANAGEMENT ----------------------- */

io.on('connection', function(socket){
  console.log('new socket connected with id: ', socket.id)

  streamListeners[socket.id] = new StreamListener(socket)

  socket.on('activate', () => {
    streamListeners[socket.id].activate()
    console.log('activated')
  })

  socket.on('stop', () => {
    streamListeners[socket.id].stop()
    console.log('stopped')
  })

  socket.on('switch', (topic) => {
    switchTrack(topic)
    console.log('switch to: ', topic)
  })

  // event that runs anytime a socket disconnects
  socket.on('disconnect', function(){
    delete streamListeners[socket.id]
    console.log('socket id ' + socket.id + ' has disconnected. : (');
  })
})

/* ------------------- SERVER ACTIVATED ----------------------- */

server.listen(3000, function () {
  console.log('Server listening on port 3000...');
});

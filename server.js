'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const volleyball = require('volleyball');
var Twitter = require('twitter');
// const passport = require('passport')
const app = express();

var http = require('http');
var server = http.createServer();
const credentials = require('./credentials')


var client = new Twitter(credentials);

var stream = client.stream('statuses/filter', {track: 'gators'});

stream.on('error', function(error) {
  throw error;
});



var socketio = require('socket.io');
server.on('request', app);
var io = socketio(server);

io.on('connection', function(socket){

  socket.on('activate', function(){
    console.log('activated')
  })

  stream.on('data', function(tweet) {
    let parsedTweet = {text: tweet.text,
                       coordinates: tweet.coordinates,
                       user: tweet.user.name,
                       userPop: tweet.user.followers_count
                     }
    console.log('new tweet emitted')
    socket.emit('tweet', parsedTweet)
  });
  // let wordArr = ['sup', 'bro', 'whatup boss the bro']
  // let randWord = 'sup'

  // setInterval(function() {
  //   socket.emit('tweet', {text: randWord, coordinates: [0, 1], user: 'billy bob', userPop: 1})
  //   randWord = wordArr[Math.floor(Math.random() * 3)]
  // }, 5000)


  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  //event that runs anytime a socket disconnects
  socket.on('disconnect', function(){
    console.log('socket id ' + socket.id + ' has disconnected. : (');
  })
})


// logging and parsing requests
app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// sending required files with routers
app.use('/public', express.static('public'));
app.use('/api', require('./server/api'))

// send the starting file
const indexPath = __dirname + '/public/index.html'

app.get('/*', (req, res) =>{
  res.sendFile(indexPath)
})

// server listening
server.listen(3000, function () {
  console.log('Server listening on port 3000...');
});

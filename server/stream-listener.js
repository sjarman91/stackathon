function StreamListener(socket) {
    this.sendData = false
    this.socket = socket
}

StreamListener.prototype.activate = function() {
  this.sendData = true
}

StreamListener.prototype.stop = function() {
  this.sendData = false
}

StreamListener.prototype.emitTweet = function(tweet) {
  this.socket.emit('tweet', tweet)
}

module.exports = StreamListener
